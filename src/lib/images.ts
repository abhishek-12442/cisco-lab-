import heroNetworkingLab from '../assets/images/hero_networking_lab_1794585422763.jpg';
import courseCcnaRack from '../assets/images/course_ccna_rack_1794585423760.jpg';
import courseCyberLinux from '../assets/images/course_cyber_linux_1794585423700.jpg';
import courseHardwareCctv from '../assets/images/course_hardware_cctv_1794585424640.jpg';
import galleryClassroomTraining from '../assets/images/gallery_classroom_training_1794585424352.jpg';

export const IMAGE_ASSET_MAP: Record<string, string> = {
  'hero-lab': heroNetworkingLab,
  'ccna-rack': courseCcnaRack,
  'cyber-linux': courseCyberLinux,
  'hardware-cctv': courseHardwareCctv,
  'classroom-training': galleryClassroomTraining,
};

export const IMAGE_PRESET_OPTIONS = [
  { key: 'hero-lab', label: 'Networking & Topology Lab' },
  { key: 'ccna-rack', label: 'Cisco Switch & Router Rack' },
  { key: 'cyber-linux', label: 'Linux & Cybersecurity Workstation' },
  { key: 'hardware-cctv', label: 'Hardware & CCTV Workbench' },
  { key: 'classroom-training', label: 'Classroom Workshop Session' },
];

export function resolveImageSrc(imageKeyOrUrl: string): string {
  if (!imageKeyOrUrl) return heroNetworkingLab;
  if (IMAGE_ASSET_MAP[imageKeyOrUrl]) {
    return IMAGE_ASSET_MAP[imageKeyOrUrl];
  }
  return imageKeyOrUrl;
}
