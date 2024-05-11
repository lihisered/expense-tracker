import { Routes, Route } from 'react-router'

import { Dashboard } from './pages/Dashboard'

export function App() {
    return (
        <div>
            <main>
                <Routes>
                    <Route path="" element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    )
}