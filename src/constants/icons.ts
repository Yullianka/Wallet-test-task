import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircle,
  faCouch,
  faBullseye,
  faMugHot,
  faFilm,
  faWifi,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';

export const ICON_REGISTRY: Record<string, IconDefinition> = {
  faApple,
  faCouch,
  faBullseye,
  faMugHot,
  faFilm,
  faWifi,
  faCreditCard,
};

export const FALLBACK_ICON: IconDefinition = faCircle;

export function resolveIcon(iconName: string): IconDefinition {
  return ICON_REGISTRY[iconName] ?? FALLBACK_ICON;
}
