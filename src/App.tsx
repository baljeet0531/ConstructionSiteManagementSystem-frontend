import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layouts/Layout';
import Login from './Components/Login/Login';
import WorkPermitFormik from './Components/WorkPermitForm/Formik';
import ToolboxFormik from './Components/ToolboxForm/Formik';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout page="dashboard" />} />
                <Route
                    path="/dashboard"
                    element={<Layout page="dashboard" />}
                />
                <Route path="/site" element={<Layout page="site" />} />
                <Route
                    path="/organization"
                    element={<Layout page="organization" />}
                />
                <Route
                    path="/people/overview"
                    element={<Layout page="people_overview" />}
                />
                <Route
                    path="/people/approval"
                    element={<Layout page="people_approval" />}
                />
                <Route
                    path="/people/establishment"
                    element={<Layout page="people_establishment" />}
                />
                <Route
                    path="/project/schedule"
                    element={<Layout page="project_schedule" />}
                />
                <Route
                    path="/project/report"
                    element={<Layout page="project_report" />}
                />
                <Route
                    path="/project/photo"
                    element={<Layout page="project_photo" />}
                />
                <Route
                    path="/eng/form/work-permit"
                    element={<Layout page="eng_work_permit_form" />}
                />
                <Route
                    path="/eng/form/toolbox"
                    element={<Layout page="eng_toolbox_form" />}
                />
                <Route
                    path="/eng/form/fault"
                    element={<Layout page="eng_fault_form" />}
                />
                <Route
                    path="/eng/form/env-security"
                    element={<Layout page="eng_env_security_form" />}
                />
                <Route
                    path="/eng/form/opcheck"
                    element={<Layout page="eng_op_check_form" />}
                />
                <Route
                    path="/eng/photo"
                    element={<Layout page="eng_photo" />}
                />
                <Route
                    path="/ehs/form/ehs-form"
                    element={<Layout page="ehs_form" />}
                />
                <Route
                    path="/ehs/form/fault"
                    element={<Layout page="ehs_fault_form" />}
                />
                <Route
                    path="/ehs/machinery/management"
                    element={<Layout page="ehs_machinery_management" />}
                />
                <Route
                    path="/ehs/photo"
                    element={<Layout page="ehs_photo" />}
                />
                <Route
                    path="/outsource/form/work-permit"
                    element={<Layout page="outsource_work_permit_form" />}
                />
                <Route
                    path="/outsource/form/toolbox"
                    element={<Layout page="outsource_toolbox_form" />}
                />
                <Route
                    path="/outsource/form/env-security"
                    element={<Layout page="outsource_env_security_form" />}
                />
                <Route
                    path="/outsource/form/opcheck"
                    element={<Layout page="outsource_op_check_form" />}
                />
                <Route
                    path="/outsource/machinery/establishment"
                    element={
                        <Layout page="outsource_machinery_establishment" />
                    }
                />
                <Route
                    path="/outsource/form/fault"
                    element={<Layout page="outsource_fault_form" />}
                />
                <Route path="/login" element={<Login />}></Route>
                {/* Single Form Page is linked below */}
                <Route
                    path="/form/work-permit"
                    element={<WorkPermitFormik />}
                />
                <Route
                    path="/form/toolbox"
                    element={<ToolboxFormik />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
