import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { MsalProvider } from '@azure/msal-react'
import { PageLayout } from './components/PageLayout'
import { HomePage } from './pages/Home'
import { DocumentsListPage } from './pages/Documents'
import { CreateDocument } from './pages/CreateDocument'
import './styles/App.css'

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route exact path="documents" element={<DocumentsListPage />} />
      <Route exact path="documents/create" element={<CreateDocument />} />
    </Routes>
  )
}

const App = ({ instance }) => {
  return (
    <Router>
      <MsalProvider instance={instance}>
        <PageLayout>
          <Pages />
        </PageLayout>
      </MsalProvider>
    </Router>
  )
}

export default App
