import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const App = () => {
  const [campaigns, setCampaigns] = useState([
    { id: 1, title: 'Bantu Korban Banjir', description: 'Membantu korban banjir di Jakarta.', goal: 10000000, collected: 4500000 },
    { id: 2, title: 'Donasi Pendidikan', description: 'Mendukung pendidikan anak-anak di pelosok.', goal: 15000000, collected: 7500000 }
  ]);
  const [user, setUser] = useState(null);
  const [donation, setDonation] = useState({ amount: '', campaignId: null });
  const [donationHistory, setDonationHistory] = useState([]);
  const [auth, setAuth] = useState({ username: '', password: '' });

  const handleLogin = () => {
    if (auth.username && auth.password) {
      setUser(auth.username);
      setAuth({ username: '', password: '' });
    }
  };

  const handleDonation = (campaignId) => {
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === campaignId
        ? { ...campaign, collected: campaign.collected + parseInt(donation.amount) }
        : campaign
    );
    setCampaigns(updatedCampaigns);
    setDonationHistory([...donationHistory, { campaignId, amount: donation.amount, user }]);
    setDonation({ amount: '', campaignId: null });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Platform Donasi Sosial</h1>

      {!user ? (
        <div className="max-w-sm mx-auto bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input type="text" placeholder="Username" value={auth.username} onChange={(e) => setAuth({ ...auth, username: e.target.value })} className="w-full p-2 mb-2 border rounded" />
          <input type="password" placeholder="Password" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} className="w-full p-2 mb-4 border rounded" />
          <Button className="w-full" onClick={handleLogin}>Login</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4">Selamat Datang, {user}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="shadow-md hover:shadow-xl transition duration-300">
                <CardContent>
                  <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
                  <p className="text-gray-700 mb-4">{campaign.description}</p>
                  <p className="text-sm text-gray-500">Terkumpul: Rp{campaign.collected.toLocaleString()} / Rp{campaign.goal.toLocaleString()}</p>
                  <input type="number" placeholder="Nominal Donasi" value={donation.campaignId === campaign.id ? donation.amount : ''} onChange={(e) => setDonation({ amount: e.target.value, campaignId: campaign.id })} className="w-full p-2 mb-2 border rounded" />
                  <Button className="w-full" onClick={() => handleDonation(campaign.id)}>Donasi Sekarang</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <h3 className="text-xl font-semibold mt-6 mb-2">Riwayat Donasi</h3>
          <ul className="list-disc pl-6">
            {donationHistory.map((history, index) => (
              <li key={index} className="text-gray-700">{user} mendonasikan Rp{parseInt(history.amount).toLocaleString()} untuk kampanye {campaigns.find(c => c.id === history.campaignId)?.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
