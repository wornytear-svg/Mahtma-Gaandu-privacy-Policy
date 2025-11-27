import React from 'react';
import { PrivacyPolicyData } from '../types';

interface PolicyDocumentProps {
  data: PrivacyPolicyData;
  enhancedContent?: string;
}

const PolicyDocument: React.FC<PolicyDocumentProps> = ({ data, enhancedContent }) => {
  // If we have AI generated content, render that as simple markdown-like text
  if (enhancedContent) {
    return (
      <div className="bg-white text-gray-900 p-8 md:p-12 shadow-xl rounded-lg max-w-4xl mx-auto min-h-[600px] font-serif">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700">
            {enhancedContent}
        </pre>
      </div>
    );
  }

  // Default rendering based on structured data
  return (
    <div className="bg-white text-gray-900 p-8 md:p-12 shadow-xl rounded-lg max-w-4xl mx-auto font-sans border-t-8 border-indigo-600">
      <header className="mb-10 text-center border-b pb-8 border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.metadata.name}</h1>
        <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Privacy Policy</p>
        <div className="mt-4 flex flex-col md:flex-row justify-center gap-4 text-sm text-gray-500">
           <span>Effective Date: <span className="text-gray-900 font-medium">{data.metadata.createdDate}</span></span>
           <span className="hidden md:inline">•</span>
           <span>Last Updated: <span className="text-gray-900 font-medium">{data.metadata.lastUpdated}</span></span>
        </div>
      </header>

      <div className="space-y-8">
        <section>
            <p className="text-gray-700 leading-relaxed">
                <strong>{data.metadata.name}</strong> is a {data.metadata.type} designed for entertainment and automated message interactions. 
                This Privacy Policy explains what information the bot collects, how it is used, and how it is stored.
            </p>
        </section>

        {data.sections.map((section) => (
          <section key={section.id} className="group">
            <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100 group-hover:text-indigo-600 transition-colors">
              {section.title}
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </section>
        ))}

        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Contact & Support</h2>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <span className="block text-xs text-gray-500 uppercase font-bold">Created By</span>
                     <span className="text-gray-900 font-medium">{data.metadata.creatorName}</span>
                 </div>
                 <div>
                     <span className="block text-xs text-gray-500 uppercase font-bold">Support Email</span>
                     <a href={`mailto:${data.metadata.supportEmail}`} className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                        {data.metadata.supportEmail}
                     </a>
                 </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PolicyDocument;
