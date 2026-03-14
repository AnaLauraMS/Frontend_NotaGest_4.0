'use client';

import React, { useState } from 'react';
import {
    HomeIcon,
    FolderIcon,
    ChartBarIcon,
    ChevronDownIcon,
    DocumentPlusIcon,
    BuildingOfficeIcon,
    DocumentArrowDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
    setActiveView: (view: any) => void;
    handleListFiles: () => void;
    handleListProperties: () => void;
    generatePDF: () => void;
    exportExcel: () => void;
    isSidebarOpen: boolean; // Controle mobile
    toggleSidebar: () => void; // Toggle mobile
}

const Sidebar: React.FC<SidebarProps> = ({
    setActiveView,
    handleListFiles,
    generatePDF,
    exportExcel,
    isSidebarOpen,
    handleListProperties,
    toggleSidebar
}) => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(true); // Estado para recolher

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        setOpenSection(null); // Fecha submenus ao recolher
    };

    const handleClickLink = (view: any, action?: () => void) => {
        setActiveView(view);
        if (action) action();
        if (typeof window !== "undefined" && window.innerWidth < 1024) toggleSidebar();
    };

    return (
        <>
            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-white border-r border-gray-100
                    transition-all duration-300 ease-in-out z-[100]
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:static 
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}
            >
                {/* Botão de Recolher (Desktop) */}
                <button 
                    onClick={toggleCollapse}
                    className="hidden lg:flex absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 z-[110]"
                >
                    {isCollapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
                </button>

                {/* Logo */}
                <div className={`flex items-center gap-3 px-6 mb-8 mt-6 ${isCollapsed ? 'justify-center px-0' : ''}`}>
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold">
                        N
                    </div>
                    {!isCollapsed && <span className="text-xl font-bold text-gray-800 truncate">Notagest</span>}
                </div>

                <nav className="space-y-2 px-4">
                    {/* Dashboard */}
                    <button 
                        onClick={() => handleClickLink('dashboard')}
                        className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                        title="Dashboard"
                    >
                        <HomeIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                        {!isCollapsed && <span className="ml-3 text-gray-700">Dashboard</span>}
                    </button>

                    {/* Gestão de Arquivos */}
                    <div className="relative">
                        <button 
                            onClick={() => isCollapsed ? setIsCollapsed(false) : setOpenSection(openSection === 'arquivos' ? null : 'arquivos')}
                            className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <div className="flex items-center">
                                <FolderIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                                {!isCollapsed && <span className="ml-3 text-gray-700">Arquivos</span>}
                            </div>
                            {!isCollapsed && <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSection === 'arquivos' ? 'rotate-180' : ''}`} />}
                        </button>
                        
                        {!isCollapsed && openSection === 'arquivos' && (
                            <div className="ml-9 mt-1 space-y-1">
                                <button onClick={() => handleClickLink('files', handleListFiles)} className="block w-full text-left text-sm py-2 text-gray-500 hover:text-blue-600">Listar</button>
                                <button onClick={() => handleClickLink('addFile')} className="block w-full text-left text-sm py-2 text-gray-500 hover:text-blue-600">Adicionar</button>
                            </div>
                        )}
                    </div>

                    {/* Relatórios */}
                    <div>
                        <button 
                            onClick={() => isCollapsed ? setIsCollapsed(false) : setOpenSection(openSection === 'relatorios' ? null : 'relatorios')}
                            className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <div className="flex items-center">
                                <ChartBarIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                                {!isCollapsed && <span className="ml-3 text-gray-700">Relatórios</span>}
                            </div>
                            {!isCollapsed && <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSection === 'relatorios' ? 'rotate-180' : ''}`} />}
                        </button>
                        
                        {!isCollapsed && openSection === 'relatorios' && (
                            <div className="ml-9 mt-1 space-y-1">
                                <button onClick={generatePDF} className="flex items-center w-full text-sm py-2 text-gray-500 hover:text-red-600">
                                    <DocumentArrowDownIcon className="w-4 h-4 mr-2" /> PDF
                                </button>
                                <button onClick={exportExcel} className="flex items-center w-full text-sm py-2 text-gray-500 hover:text-green-600">
                                    <DocumentArrowDownIcon className="w-4 h-4 mr-2" /> Excel
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </aside>

            {/* Overlay Mobile */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden" onClick={toggleSidebar} />}
        </>
    );
};

export default Sidebar;