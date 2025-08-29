'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { UniversityResources, Resource } from '@/lib/resources';
import { FileText, Video, Download, ExternalLink, Play } from 'lucide-react';

interface ResourceListProps {
  resources: UniversityResources;
}

export default function ResourceList({ resources }: ResourceListProps) {
  const t = useTranslations('resources');
  const params = useParams();
  const locale = params.locale as string;

  const handleDownload = async (resource: Resource) => {
    if (resource.type === 'pdf' && resource.file) {
      // Track download
      const response = await fetch(`/${locale}/api/download/${resource.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${resource.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    }
  };

  const handleVideoClick = (resource: Resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    }
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'video':
        return Video;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-12">
      {resources.categories.map((category) => (
        <div key={category.id} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {category.title[locale as keyof typeof category.title]}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.resources.map((resource) => {
              const Icon = getResourceIcon(resource.type);
              
              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Icon className="w-5 h-5 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-500 uppercase tracking-wide">
                            {resource.type}
                          </span>
                          {resource.duration && (
                            <span className="ml-2 text-sm text-gray-400">
                              {resource.duration}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {resource.title[locale as keyof typeof resource.title]}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {resource.description[locale as keyof typeof resource.description]}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      {resource.type === 'pdf' ? (
                        <button
                          onClick={() => handleDownload(resource)}
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {t('downloadPdf')}
                        </button>
                      ) : resource.type === 'video' ? (
                        <button
                          onClick={() => handleVideoClick(resource)}
                          className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {t('watchVideo')}
                        </button>
                      ) : (
                        <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open
                        </button>
                      )}

                      {resource.downloadCount !== undefined && (
                        <span className="text-xs text-gray-400">
                          {resource.downloadCount} downloads
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}