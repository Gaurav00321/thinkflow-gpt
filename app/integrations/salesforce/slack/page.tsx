import Script from 'next/script';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salesforce to Slack Integration | ThinkFlowGPT AI Workflow',
  description: 'Connect Salesforce API with Slack triggers instantly using Agentic Automation. Create triggers for new leads routing natively.',
};

export default function IntegrationPage() {
  const toolA = 'salesforce';
  const toolB = 'slack';
  const toolAName = 'Salesforce';
  const toolBName = 'Slack';
  
  return (
    <article className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
          Automate <span className="capitalize">{toolAName}</span> and <span className="capitalize">{toolBName}</span> Natively with AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Seamlessly connect your tools. No code required.
        </p>
      </div>

       {/* Semantic HTML Table for Featured Snippets */}
       <div className="sr-only hidden-visually-but-readable-for-seo">
         <table border={1}>
           <thead>
             <tr><th>Salesforce Triggers</th><th>Slack Actions</th></tr>
           </thead>
           <tbody>
             <tr><td>On New Lead Creation</td><td>Send Channel Message</td></tr>
             <tr><td>Opportunity Status Update</td><td>Direct Message User</td></tr>
           </tbody>
         </table>
       </div>
       
       <Script
         id="integration-schema"
         type="application/ld+json"
         dangerouslySetInnerHTML={{
           __html: JSON.stringify({
             "@context": "https://schema.org",
             "@graph": [
               {
                 "@type": "SoftwareApplication",
                 "@id": `https://thinkflowgpt.vercel.app/integrations/${toolA}/${toolB}/#software`,
                 "name": `ThinkFlowGPT: ${toolAName} to ${toolBName} Integration`,
                 "applicationCategory": "BusinessApplication",
                 "provider": { "@id": "https://thinkflowgpt.vercel.app/#organization" },
                 "isRelatedTo": [
                   { "@type": "SoftwareApplication", "name": "Salesforce" },
                   { "@type": "SoftwareApplication", "name": "Slack" }
                 ]
               },
               {
                 "@type": "FAQPage",
                 "mainEntity": [
                   {
                     "@type": "Question",
                     "name": "How do I connect Salesforce to Slack?",
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": "Using ThinkFlowGPT's agentic endpoints, simply authenticate your Salesforce CRM and map the event conditions natively into your Slack channel."
                     }
                   }
                 ]
               },
               {
                 "@type": "Table", 
                 "about": "API triggers vs actions"
               }
             ]
           })
         }}
       />

       {/* Visual Placeholder for actual content */}
       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mt-8">
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
              <span className="font-bold text-blue-600 capitalize">{toolAName}</span>
            </div>
            <div className="w-12 h-1 bg-gray-200 relative">
               <div className="absolute right-0 top-1/2 -mt-1.5 border-l-[8px] border-l-gray-200 border-y-[6px] border-y-transparent"></div>
            </div>
            <div className="w-24 h-24 bg-purple-50 rounded-2xl flex items-center justify-center shadow-sm">
              <span className="font-bold text-purple-600 capitalize">{toolBName}</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
          </div>
       </div>

    </article>
  )
}