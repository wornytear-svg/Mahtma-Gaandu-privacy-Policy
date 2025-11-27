import React, { useState } from 'react';
import { PrivacyPolicyData } from './types';
import PolicyDocument from './components/PolicyDocument';
import { IconCopy, IconSparkles, IconEdit, IconCheck } from './components/Icons';
import { enhancePrivacyPolicy } from './services/geminiService';

const INITIAL_DATA: PrivacyPolicyData = {
  metadata: {
    name: 'Mahatma Gaandu',
    type: 'Discord Bot/App',
    createdDate: '20-11-2025',
    lastUpdated: '27-11-2025',
    creatorName: 'Worny',
    supportEmail: 'wornytear@gmail.com'
  },
  sections: [
    {
      id: '1',
      title: '1. Information We Collect',
      content: `1.1. Messages (Content)
The bot may temporarily store user messages only for generating automated responses, such as message repetition or Markov-based behavior.

• These messages are not shared with anyone.
• They are stored locally on the bot host machine.
• Data is only used to improve or generate bot responses.

1.2. Discord-provided Metadata
Discord automatically sends certain basic data to bots, such as:
• User ID
• Channel ID
• Server (Guild) ID
• Message timestamps

The bot uses this only to function properly. None of this data is shared or sold.`
    }
  ]
};

const App: React.FC = () => {
  const [data, setData] = useState<PrivacyPolicyData>(INITIAL_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleMetadataChange = (field: keyof typeof data.metadata, value: string) => {
    setData(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [field]: value }
    }));
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const result = await enhancePrivacyPolicy(data);
      setEnhancedContent(result);
      setIsEditing(false);
    } catch (e) {
      alert("Failed to generate AI policy. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    let textToCopy = "";
    if (enhancedContent) {
        textToCopy = enhancedContent;
    } else {
        // Simple text generation for manual mode
        textToCopy = `# ${data.metadata.name} - Privacy Policy\n\n`;
        textToCopy += `Last Updated: ${data.metadata.lastUpdated}\n\n`;
        textToCopy += `${data.metadata.name} is a ${data.metadata.type} designed for entertainment.\n\n`;
        data.sections.forEach(s => {
            textToCopy += `## ${s.title}\n${s.content}\n\n`;
        });
        textToCopy += `## Contact\nCreated By: ${data.metadata.creatorName}\nEmail: ${data.metadata.supportEmail}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const resetToOriginal = () => {
    setEnhancedContent(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Navigation / Header */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                P
              </div>
              <span className="text-white font-bold text-lg hidden sm:block">PolicyGen</span>
            </div>
            
            <div className="flex items-center gap-2">
              {!isEditing ? (
                 <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                  title="Edit Metadata"
                 >
                   <IconEdit className="h-5 w-5" />
                 </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Done
                </button>
              )}

              <div className="h-6 w-px bg-gray-700 mx-2" />

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                {copySuccess ? <IconCheck className="h-4 w-4 text-green-400" /> : <IconCopy className="h-4 w-4" />}
                {copySuccess ? "Copied" : "Copy Text"}
              </button>

              <button
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full block"></span>
                ) : (
                    <IconSparkles className="h-4 w-4" />
                )}
                <span>AI Polish</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {enhancedContent && (
             <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-lg">
                <p className="text-indigo-200 text-sm">
                    <span className="font-bold">✨ AI Enhanced Mode active.</span> This version is polished for professionalism.
                </p>
                <button 
                    onClick={resetToOriginal} 
                    className="text-xs text-indigo-300 hover:text-white underline"
                >
                    Revert to original
                </button>
             </div>
        )}

        <div className={`grid grid-cols-1 ${isEditing ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8 transition-all duration-300`}>
          
          {/* Editor Sidebar (Conditional) */}
          {isEditing && (
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4">Metadata</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Bot Name</label>
                        <input 
                            type="text" 
                            value={data.metadata.name}
                            onChange={(e) => handleMetadataChange('name', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Created Date</label>
                        <input 
                            type="text" 
                            value={data.metadata.createdDate}
                            onChange={(e) => handleMetadataChange('createdDate', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Last Updated</label>
                        <input 
                            type="text" 
                            value={data.metadata.lastUpdated}
                            onChange={(e) => handleMetadataChange('lastUpdated', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Creator Name</label>
                        <input 
                            type="text" 
                            value={data.metadata.creatorName}
                            onChange={(e) => handleMetadataChange('creatorName', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Support Email</label>
                        <input 
                            type="text" 
                            value={data.metadata.supportEmail}
                            onChange={(e) => handleMetadataChange('supportEmail', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div className="pt-4 text-xs text-gray-500">
                        Edit the sections in the code or use AI to rewrite based on these values.
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* Document Preview */}
          <div className={isEditing ? 'lg:col-span-2' : 'lg:col-span-1'}>
            <PolicyDocument data={data} enhancedContent={enhancedContent} />
          </div>
        </div>
      </main>
      
      <footer className="text-center text-gray-600 text-sm py-8">
        <p>Generated for Discord API compliance.</p>
      </footer>
    </div>
  );
};

export default App;
