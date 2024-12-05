import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { TeamRegistration } from './components/team-registration'
import { IdeaSubmission } from './components/idea-submission'
import { Page } from './components/src-app-domain-exploration-page'
import { ProjectPage } from './components/src-app-project-description-page'
import { MetricsInsightsDashboardComponent } from './components/metrics-insights-dashboard'
import { ProjectManagementDashboardComponent } from './components/project-management-dashboard'
import { LandingPage } from './components/landing-page'
import { AuthFormComponent } from './components/auth-form'
import AuthPage from './components/AuthPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/auth" element={<AuthPage/>} />
      <Route path='/idea' element={<IdeaSubmission/>}/>
      <Route path='/domain' element={<Page/>} />
      <Route path='/project' element={<ProjectPage/>}/>
      <Route path='/pro-dashboard' element={<ProjectManagementDashboardComponent/>}/>
      <Route path='/metrics' element={<MetricsInsightsDashboardComponent/>} />
    </Routes>
    </>
  )
}

export default App
