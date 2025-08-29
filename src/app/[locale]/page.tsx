import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import IntroductionSection from '@/components/IntroductionSection';
import AdmissionPediaSection from '@/components/AdmissionPediaSection';
import AdmissionPediaSection2 from '@/components/AdmissionPediaSection2';

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
      welcome: '歡迎來到「香港城市大學－哥倫比亞大學 申請資源庫」！',
      welcomeFont: 'ChironHeiHK Bold, sans-serif',
      bodyFont: 'ChironSungHK Regular, serif',
      paragraph1: '自2019年開始，參加項目並入讀哥大的內地同學們在兩年時間裏，籌備並整理了有關報讀香港城市大學（城大）－哥倫比亞大學（哥大）雙聯學士學位項目的多項資源。當中既有報讀前的過程回憶，也有每位同學珍貴的經驗分享，還有對於報讀過程中出現的常見問題分析與回答。這些資源經過編輯整合，最終以問答影片及《報讀百科》（報考手冊）的形式，於2021年新建的網站上推出。期望這個整合資源平台，能為對項目有興趣的同學及家長提供參考。',
      paragraph2: '在準備手冊與影片的過程中，2017級（2019年入讀哥大）的所有內地同學都得到了城大環球事務拓展處（GEO）以及城大商學院的全力支持與幫助。在此，謹向城大、哥大的有關部門和老師致以誠摯的謝意！'
    }
  };

  // Admission-Pedia section content (2019 version)
  const admissionPediaContent = {
    en: {
      title: 'ADMISSION-PEDIA',
      titleFont: 'Sofia Sans Black, sans-serif',
      section: 'Year 2019 Version',
      sectionFont: 'Sofia Sans ExtraBold, sans-serif',
      bodyFont: 'Sofia Sans Light, sans-serif',
      paragraph1: 'In the first semester at Columbia, Mainland Chinese students of cohort 2017 (who entered Columbia in 2019) cooperated and composed two volumes of "Admission-Pedia (Admission Encyclopedia)". "Admission-Pedia" has the main steps of preparation before and after the application. It contains the necessary introduction and detailed explanations of the application process. Besides, there are comments and tips from students. It can serve as a reference for interested students and parents.',
      paragraph2: 'The preparation of "Admission-Pedia" is initiated and led by Jiangtian Hou from cohort 2017 (who entered Columbia in 2019) and it is completed with help from Mainland Chinese students from the same cohort: Yijie Fang, Wenda Li, Qimeng Shi, Zhenfeng Tu, Hanyi Wang. It is published with being revised and supported by CityU College of Business. The Simplified Chinese version of "Application Encyclopedia" is also published on the official WeChat account of Chinese Students and Scholars Association of CityU (CSSAUG).'
    },
    'zh-cn': {
      title: '报读百科',
      titleFont: 'ZhiBingMei Heavy, sans-serif',
      section: '2019年版',
      sectionFont: 'ZhiBingMei Bold, sans-serif',
      bodyFont: 'FangZheng XiYaSong, serif',
      paragraph1: '2017级（2019年入读哥大）的内地生同学们，在到达哥大后的一个学期里，合作编写了两册《报读百科》。《报读百科》包括报读双学位项目前和获得录取后的主要准备过程，对于当时必要的报名流程有详细的介绍和说明，还穿插配合了同学们的建议与提醒，可以供有意报读的同学和家长们参考。',
      paragraph2: '《2019年 报读百科 城大卷》的编写由2017级（2019年入读哥大）侯江天同学发起并主导，在同届内地同学方毅劼、李闻达、石启蒙、涂振峰、王涵一的合作配合下，经城大商学院审稿与支持后，公开发布。简体中文版的《报读百科》同时发布在城大内地学生学者联谊会本科部（CSSAUG）微信公众号。'
    },
    'zh-hk': {
      title: '報讀百科',
      titleFont: 'ChironHeiHK Heavy, sans-serif',
      section: '2019年版',
      sectionFont: 'ChironHeiHK Bold, sans-serif',
      bodyFont: 'ChironSungHK Regular, serif',
      paragraph1: '2017級（2019年入讀哥大）的內地同學們，在到達哥大後的一個學期裏，合作編寫了兩冊《報讀百科》。《報讀百科》涵蓋了報讀雙學位項目前以及獲得錄取後的主要準備過程，對於當時必要的報名流程有詳細的介紹與說明，亦穿插了同學們的建議與提醒，可供有意報讀的同學與家長參考。',
      paragraph2: '《2019年 報讀百科 城大卷》的編寫由2017級（2019年入讀哥大）侯江天同學發起並主導，在同屆內地同學方毅劼、李聞達、石啟蒙、涂振峰、王涵一的合作配合下，經城大商學院審稿與支持後，正式公開發佈。簡體中文版的《報讀百科》亦同時在城大內地學生學者聯誼會本科部（CSSAUG）微信公眾號發佈。'
    }
  };

  // Admission-Pedia section content (2025 version)
  const admissionPediaContent2025 = {
    en: {
      title: 'ADMISSION-PEDIA',
      titleFont: 'Sofia Sans Black, sans-serif',
      section: 'Year 2025 Version',
      sectionFont: 'Sofia Sans ExtraBold, sans-serif',
      bodyFont: 'Sofia Sans Light, sans-serif',
      paragraph1: 'Since 2025, Lezhi Ma (Class of 2022) has made significant efforts in coordinating and organizing the revisions of the handbook and provided important suggestions and feedback on its content. Several editors from the Class of 2022 and Class of 2023 of this program updated the content of the handbook and contributed valuable suggestions for the 2025 edition.',
      paragraph2: 'The 2025 edition of Admission-Pedia: Volume of Columbia was initiated and led by Lezhi Ma (Class of 2022, who entered Columbia in 2024). It was completed with the cooperation of Mainland Chinese students Jianbo He, Hengche Liu, Yixian Liu, Ying Wang, Siyi Xu, and Yuhan Zhang. After being reviewed, edited, and designed by Jiangtian Hou, it was officially published on this website. The Simplified Chinese version of Admission-Pedia is also available on the official WeChat account of the CityU Chinese Students and Scholars Association Undergraduate Division (CSSAUG).'
    },
    'zh-cn': {
      title: '报读百科',
      titleFont: 'ZhiBingMei Heavy, sans-serif',
      section: '2025年版',
      sectionFont: 'ZhiBingMei Bold, sans-serif',
      bodyFont: 'FangZheng XiYaSong, serif',
      paragraph1: '2025年以来，马乐之同学（2022级）为手册内容的修订做了大量统筹协调工作，对手册内容提出了重要的意见建议。来自本课程的多名2022级与2023级编者同学更新了手册内容，为2025年版手册的修订提出了很好的意见建议。',
      paragraph2: '《2025年 报读百科 哥大卷》由2022级（2024年入读哥大）马乐之同学发起并主导，在内地同学贺建博、刘恒澈、刘懿娴、王滢、徐嗣怡、张语涵的合作配合下，由侯江天审稿并编辑设计后，在本网站公开发布。简体中文版的《报读百科》同时发布在城大内地学生学者联谊会本科部（CSSAUG）微信公众号。'
    },
    'zh-hk': {
      title: '報讀百科',
      titleFont: 'ChironHeiHK Heavy, sans-serif',
      section: '2025年版',
      sectionFont: 'ChironHeiHK Bold, sans-serif',
      bodyFont: 'ChironSungHK Regular, serif',
      paragraph1: '自2025年以來，馬樂之同學（2022級）為手冊內容的修訂做了大量統籌協調工作，並對手冊內容提出了重要的意見和建議。來自本課程的多名2022級與2023級編者同學更新了手冊內容，亦為2025年版手冊的修訂提出了很好的建議。',
      paragraph2: '《2025年 報讀百科 哥大卷》由2022級（2024年入讀哥大）馬樂之同學發起並主導，在內地同學賀建博、劉恒澈、劉懿嫻、王瀅、徐嗣怡、張語涵的合作配合下，由侯江天審稿並進行編輯設計後，在本網站公開發佈。簡體中文版的《報讀百科》同時發佈在城大內地學生學者聯誼會本科部（CSSAUG）微信公眾號。'
    }
  };

  const currentContent = content[locale as keyof typeof content] || content.en;
  const currentAdmissionPediaContent = admissionPediaContent[locale as keyof typeof admissionPediaContent] || admissionPediaContent.en;
  const currentAdmissionPediaContent2025 = admissionPediaContent2025[locale as keyof typeof admissionPediaContent2025] || admissionPediaContent2025.en;

  return (
    <div>
      <Hero />
      <IntroductionSection currentContent={currentContent} />
      <AdmissionPediaSection currentContent={currentAdmissionPediaContent} />
      <AdmissionPediaSection2 currentContent={currentAdmissionPediaContent2025} />
    </div>
  );
}