import nav from './nav';
import editor from './editor';
import beautifier from './beautifier';
import rounded from './rounded';
import remover from './remover';
import compressor from './compressor';
import longImage from './longImage';
import screenshot from './screenshot';
import videoConvert from './videoConvert';
import convert from './convert';
import viewer from './viewer';

export default {
    title: '무료 온라인 사진 편집기',
    description: '사진을 무료로 온라인 편집하고, 크기 조절과 필터를 적용하며, 이미지를 JPG/PNG/JPEG/WebP로 변환하고 영역 또는 전체 페이지 스크린샷을 캡처하세요.',
    keywords: 'ShotEasy, 온라인 스크린샷, 사진 편집, 사진 변환기, 이미지 변환기, 온라인 편집기, 이미지 형식 온라인 변환, 이미지를 jpg로 변환, jpg to webp, jpg to png',
    privacy: '개인정보처리방침',
    terms: '이용약관',
    blog: '블로그',
    footerToolsTitle: 'ShotEasy 핵심 도구',
    footerToolsIntro: '스크린샷, 이미지, 비디오 및 브라우저 로컬 도구 바로가기.',
    localProcessing: {
        title: '업로드 없이 로컬 처리',
        cont1: '파일은 브라우저에서 로컬로 처리됩니다. ShotEasy는 이 도구들을 위해 이미지나 비디오를 서버에 업로드할 필요가 없습니다.',
        cont2: '스크린샷, 개인 사진, 문서, 튜토리얼, 제품 이미지, 빠른 메모를 더 나은 개인정보 보호와 함께 사용할 수 있습니다.'
    },
    nav,
    editor,
    beautifier,
    rounded,
    remover,
    compressor,
    longImage,
    screenshot,
    videoConvert,
    convert,
    viewer
}
