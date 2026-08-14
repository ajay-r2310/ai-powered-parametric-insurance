import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Landing & Auth
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

// Farmer Console Pages
import { FarmerDashboardPage } from './pages/farmer/FarmerDashboardPage';
import { FarmDetailsPage } from './pages/farmer/FarmDetailsPage';
import { ClimateIntelligencePage } from './pages/farmer/ClimateIntelligencePage';
import { RiskEventsPage } from './pages/farmer/RiskEventsPage';
import { PayoutsPage } from './pages/farmer/PayoutsPage';
import { NotificationsPage } from './pages/farmer/NotificationsPage';
import { ProfilePage } from './pages/farmer/ProfilePage';

// Policy Pages
import { PolicyPage } from './pages/policies/PolicyPage';
import { CreatePolicyPage } from './pages/policies/CreatePolicyPage';

// Admin Console Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminFarmersPage } from './pages/admin/AdminFarmersPage';
import { AdminPoliciesPage } from './pages/admin/AdminPoliciesPage';
import { AdminRiskPage } from './pages/admin/AdminRiskPage';
import { AdminTriggersPage } from './pages/admin/AdminTriggersPage';
import { AdminPayoutsPage } from './pages/admin/AdminPayoutsPage';
import { AdminIoTPage } from './pages/admin/AdminIoTPage';
import { AdminSatellitePage } from './pages/admin/AdminSatellitePage';
import { AdminBlockchainPage } from './pages/admin/AdminBlockchainPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Hackathon Demo Simulator Centerpiece
import { DemoSimulatorPage } from './pages/demo/DemoSimulatorPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication & Onboarding */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Farmer Console */}
          <Route path="/farmer" element={<FarmerDashboardPage />} />
          <Route path="/farmer/farm" element={<FarmDetailsPage />} />
          <Route path="/farmer/policy" element={<PolicyPage />} />
          <Route path="/farmer/policy/create" element={<CreatePolicyPage />} />
          <Route path="/farmer/climate" element={<ClimateIntelligencePage />} />
          <Route path="/farmer/risk-events" element={<RiskEventsPage />} />
          <Route path="/farmer/payouts" element={<PayoutsPage />} />
          <Route path="/farmer/notifications" element={<NotificationsPage />} />
          <Route path="/farmer/profile" element={<ProfilePage />} />

          {/* Enterprise Admin Operations */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/farmers" element={<AdminFarmersPage />} />
          <Route path="/admin/policies" element={<AdminPoliciesPage />} />
          <Route path="/admin/risk" element={<AdminRiskPage />} />
          <Route path="/admin/triggers" element={<AdminTriggersPage />} />
          <Route path="/admin/payouts" element={<AdminPayoutsPage />} />
          <Route path="/admin/iot" element={<AdminIoTPage />} />
          <Route path="/admin/satellite" element={<AdminSatellitePage />} />
          <Route path="/admin/blockchain" element={<AdminBlockchainPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />

          {/* Hackathon Demo Simulator Centerpiece */}
          <Route path="/demo" element={<DemoSimulatorPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
