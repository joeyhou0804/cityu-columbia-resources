import resourcesData from '@/content/resources.json';
import { Locale } from '@/i18n';

export interface Resource {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  type: 'pdf' | 'video' | 'link';
  file?: string;
  url?: string;
  platform?: 'youtube' | 'vimeo' | 'bilibili';
  duration?: string;
  downloadCount?: number;
}

export interface ResourceCategory {
  id: string;
  title: Record<Locale, string>;
  resources: Resource[];
}

export interface UniversityResources {
  categories: ResourceCategory[];
}

export interface ResourcesData {
  cityu: UniversityResources;
  columbia: UniversityResources;
}

export const getResources = (): ResourcesData => {
  return resourcesData as ResourcesData;
};

export const getCityUResources = (): UniversityResources => {
  return getResources().cityu;
};

export const getColumbiaResources = (): UniversityResources => {
  return getResources().columbia;
};

export const getResourceById = (id: string): Resource | null => {
  const resources = getResources();
  
  for (const university of [resources.cityu, resources.columbia]) {
    for (const category of university.categories) {
      const resource = category.resources.find(r => r.id === id);
      if (resource) return resource;
    }
  }
  
  return null;
};

export const incrementDownloadCount = async (resourceId: string): Promise<void> => {
  // In a real app, this would update the database
  // For now, we'll just log it
  console.log(`Download count incremented for resource: ${resourceId}`);
};