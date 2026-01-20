const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "../database/members.json");

function readMembers() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
  const raw = fs.readFileSync(filePath, 'utf8') || '[]';
  return JSON.parse(raw);
}

function writeMembers(members) {
  fs.writeFileSync(filePath, JSON.stringify(members, null, 2));
}

// Create a mock payment intent and return a clientSecret
exports.createPayment = (req, res) => {
  const { planId } = req.body || {};
  if (!planId) return res.status(400).json({ success: false, message: 'planId required' });

  // create mock payment id/secret
  const paymentId = `pay_${Date.now()}`;
  const clientSecret = `mock_secret_${paymentId}`;

  return res.json({ success: true, paymentId, clientSecret });
};

// Confirm mock payment and attach subscription to member
exports.confirmPayment = (req, res) => {
  const { paymentId, plan } = req.body || {};
  if (!paymentId || !plan) return res.status(400).json({ success: false, message: 'paymentId and plan required' });

  // find member by req.user (auth middleware should set it)
  const members = readMembers();
  const idx = members.findIndex(m => m.id === req.user.id || m.phone === req.user.phone);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Member not found' });

  // attach a simple subscription object
  const subscription = {
    id: plan.id || plan.planId || `${plan.title || 'plan'}_${Date.now()}`,
    title: plan.title || plan.name || 'Subscription',
    price: plan.price || plan.amount || '0',
    startedAt: new Date().toISOString(),
    paymentId,
  };

  members[idx].subscription = subscription;
  writeMembers(members);

  const safe = { ...members[idx] };
  delete safe.passwordHash;

  return res.json({ success: true, member: safe, subscription });
};
