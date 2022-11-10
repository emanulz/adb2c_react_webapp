import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { MsalProvider } from '@azure/msal-react'
import { PageLayout } from './components/PageLayout'
import { HomePage } from './pages/Home'
import { DocumentsListPage } from './pages/Documents'
import { CreateDocument } from './pages/CreateDocument'
import './styles/App.css'

import { msalInstance } from './services/authConfig'

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route exact path="documents" element={<DocumentsListPage />} />
      <Route exact path="documents/create" element={<CreateDocument />} />
    </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <MsalProvider instance={msalInstance}>
        <PageLayout>
          <Pages />
        </PageLayout>
      </MsalProvider>
    </Router>
  )
}

export default App
