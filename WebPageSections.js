import React from 'react';
import WebPageSection from './components/WebPageSection';

function WebPageSections() {
    return (
        <div>
            <main>
                <WebPageSection id="background" title="Background" content="I am an engineer and professional with experience in..." />
                <WebPageSection id="open_source" title="Open Source Philosophy" content="My philosophy on open source is..." />
                <WebPageSection id="promo_message" title="Promotional Message" content="Promoting the spread of programming languages..." />
                <WebPageSection id="languages" title="Languages" content="Installation Guides, User Guides, Developer Guides, Administration Guides, Manuals, Books, Examples, External Material, Projects" />
                <WebPageSection id="frameworks" title="Frameworks" content="Installation Guides, User Guides, Developer Guides, Administration Guides, Manuals, Books, Examples, External Material, Projects" />
                <WebPageSection id="libraries" title="Libraries" content="Installation Guides, User Guides, Developer Guides, Administration Guides, Manuals, Books, Examples, External Material, Projects" />
                <WebPageSection id="tools" title="Tools" content="Installation Guides, User Guides, Developer Guides, Administration Guides, Manuals, Books, Examples, External Material, Projects" />
                <WebPageSection id="dbms" title="DBMS" content="Installation Guides, User Guides, Developer Guides, Administration Guides, Manuals, Books, Examples, External Material, Projects" />
                <WebPageSection id="ide" title="IDE" content="Installation Guides, User Guides, Developer Guides, Administration Guides, Manuals, Books, Examples, External Material, Projects" />
                <WebPageSection id="versioning" title="Versioning" content="Installation Guides, User Guides, Developer Guides, Administration Guides, Manuals, Books, Examples, External Material, Projects" />
            </main>
        </div>
    );
}

export default WebPageSections;
