import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import IntroductionSection from '@/components/IntroductionSection';
import AdmissionPediaSection from '@/components/AdmissionPediaSection';

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  // Content configuration for each language
  const content = {
    en: {
      title: 'INTRODUCTION',
      titleFont: 'Sofia Sans Black, sans-serif',
      welcome: 'Welcome to "CityU Columbia Resources"!',
      welcomeFont: 'Sofia Sans ExtraBold, sans-serif',
      bodyFont: 'Sofia Sans Light, sans-serif',
      paragraph1: 'Since 2019, Mainland Chinese students who are taking the program and studying at Columbia have spent two years collecting and preparing for multiple resources about the Joint Bachelors Degree Program between City University of Hong Kong (CityU) and Columbia University (Columbia). There are the application procedures, precious experiences from everyone, and analysis or answers to the questions that one may have during applications. After editing and integrating, these resources have finally been delivered to the public in the forms of Q&A videos and "Admission-Pedia" (the application reference handbook) on this freshly built website in 2021. We hope this website can serve as a reference for students and parents who are interested in this program.',
      paragraph2: 'During the process of compiling reference books and videos, all Mainland Chinese students of cohort 2017 (who entered Columbia in 2019) have gained full support and help from CityU Global Engagement Office (GEO) and CityU College of Business. We hereby express our greatest and warmest gratitude to the relevant departments and faculty of CityU and Columbia!'
    },
    'zh-cn': {
      title: '本站介绍',
      titleFont: 'ZhiBingMei Heavy, sans-serif',
      welcome: '欢迎来到"香港城市大学-哥伦比亚大学 申请资源库"！',
      welcomeFont: 'ZhiBingMei Bold, sans-serif',
      bodyFont: 'FangZheng XiYaSong, serif',
      paragraph1: '从2019年开始，参加项目并入读哥大的内地同学们在两年时间里，筹备并整理了有关报读香港城市大学（城大）-哥伦比亚大学（哥大）双联学士学位项目的多项资源。其中，有报读前的过程回忆，有每位同学珍贵的经验分享，也有对于报读过程中出现的常见问题分析与回答。这些资源经过编辑整合，终于以问答视频和“报读百科”（报考手册）的形式，在2021年新建的网站上面世了。希望这个整合资源平台，能为对项目感兴趣的同学与家长们提供参考。',
      paragraph2: '在准备手册与视频的过程中，2017级（2019年入读哥大）的所有内地同学得到了城大环球事务拓展处（GEO）以及城大商学院的全力支持与帮助。在这里，向城大、哥大的有关部门和老师致以诚挚的谢意！'
    },
    'zh-hk': {
      title: '本站介紹',
      titleFont: 'ChironHeiHK Heavy, sans-serif',
      welcome: '歡迎來到"香港城市大學-哥倫比亞大學 申請資源庫"！',
      welcomeFont: 'ChironHeiHK Bold, sans-serif',
      bodyFont: 'ChironSungHK Regular, serif',
      paragraph1: '從2019年開始，參加項目併入讀哥大的內地同學們在兩年時間裡，籌備並整理了有關報讀香港城市大學（城大）-哥倫比亞大學（哥大）雙聯學士學位項目的多項資源。其中，有報讀前的過程回憶，有每位同學珍貴的經驗分享，也有對於報讀過程中出現的常見問題分析與回答。這些資源經過編輯整合，終於以問答視頻和"報讀百科"（報考手冊）的形式，在2021年新建的網站上面世了。希望這個整合資源平台，能為對項目感興趣的同學與家長們提供參考。',
      paragraph2: '在準備手冊與視頻的過程中，2017級（2019年入讀哥大）的所有內地同學得到了城大環球事務拓展處（GEO）以及城大商學院的全力支持與幫助。在這裡，向城大、哥大的有關部門和老師致以誠摯的謝意！'
    }
  };

  // Admission-Pedia section content
  const admissionPediaContent = {
    en: {
      title: 'ADMISSION-PEDIA',
      titleFont: 'Sofia Sans Black, sans-serif',
      bodyFont: 'Sofia Sans Light, sans-serif',
      paragraph1: 'In the first semester at Columbia, Mainland Chinese students of cohort 2017 (who entered Columbia in 2019) cooperated and composed two volumes of "Admission-Pedia (Admission Encyclopedia)". "Admission-Pedia" has the main steps of preparation before and after the application. It contains the necessary introduction and detailed explanations of the application process. Besides, there are comments and tips from students. It can serve as a reference for interested students and parents.',
      paragraph2: 'The preparation of "Admission-Pedia" is initiated and led by Jiangtian Hou from cohort 2017 (who entered Columbia in 2019) and it is completed with help from Mainland Chinese students from the same cohort: Yijie Fang, Wenda Li, Qimeng Shi, Zhenfeng Tu, Hanyi Wang. It is published with being revised and supported by CityU College of Business. The Simplified Chinese version of "Application Encyclopedia" is also published on the official WeChat account of Chinese Students and Scholars Association of CityU (CSSAUG).'
    },
    'zh-cn': {
      title: 'ADMISSION-PEDIA',
      titleFont: 'ZhiBingMei Heavy, sans-serif',
      bodyFont: 'FangZheng XiYaSong, serif',
      paragraph1: 'In the first semester at Columbia, Mainland Chinese students of cohort 2017 (who entered Columbia in 2019) cooperated and composed two volumes of "Admission-Pedia (Admission Encyclopedia)". "Admission-Pedia" has the main steps of preparation before and after the application. It contains the necessary introduction and detailed explanations of the application process. Besides, there are comments and tips from students. It can serve as a reference for interested students and parents.',
      paragraph2: 'The preparation of "Admission-Pedia" is initiated and led by Jiangtian Hou from cohort 2017 (who entered Columbia in 2019) and it is completed with help from Mainland Chinese students from the same cohort: Yijie Fang, Wenda Li, Qimeng Shi, Zhenfeng Tu, Hanyi Wang. It is published with being revised and supported by CityU College of Business. The Simplified Chinese version of "Application Encyclopedia" is also published on the official WeChat account of Chinese Students and Scholars Association of CityU (CSSAUG).'
    },
    'zh-hk': {
      title: 'ADMISSION-PEDIA',
      titleFont: 'ChironHeiHK Heavy, sans-serif',
      bodyFont: 'ChironSungHK Regular, serif',
      paragraph1: 'In the first semester at Columbia, Mainland Chinese students of cohort 2017 (who entered Columbia in 2019) cooperated and composed two volumes of "Admission-Pedia (Admission Encyclopedia)". "Admission-Pedia" has the main steps of preparation before and after the application. It contains the necessary introduction and detailed explanations of the application process. Besides, there are comments and tips from students. It can serve as a reference for interested students and parents.',
      paragraph2: 'The preparation of "Admission-Pedia" is initiated and led by Jiangtian Hou from cohort 2017 (who entered Columbia in 2019) and it is completed with help from Mainland Chinese students from the same cohort: Yijie Fang, Wenda Li, Qimeng Shi, Zhenfeng Tu, Hanyi Wang. It is published with being revised and supported by CityU College of Business. The Simplified Chinese version of "Application Encyclopedia" is also published on the official WeChat account of Chinese Students and Scholars Association of CityU (CSSAUG).'
    }
  };

  const currentContent = content[locale as keyof typeof content] || content.en;
  const currentAdmissionPediaContent = admissionPediaContent[locale as keyof typeof admissionPediaContent] || admissionPediaContent.en;

  return (
    <div>
      <Hero />
      <IntroductionSection currentContent={currentContent} />
      <AdmissionPediaSection currentContent={currentAdmissionPediaContent} />
    </div>
  );
}