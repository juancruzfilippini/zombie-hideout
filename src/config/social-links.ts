import {
  Camera,
  Gamepad2,
  Globe2,
  MessageCircle,
  PlaySquare,
  Radio,
  Share2,
  type LucideIcon,
} from "lucide-react";

export type SocialLinkId =
  | "discord"
  | "steam"
  | "youtube"
  | "facebook"
  | "instagram"
  | "x"
  | "other";

export type SocialLink = {
  id: SocialLinkId;
  label: string;
  url: string | null;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { id: "discord", label: "Discord", url: null, icon: MessageCircle },
  { id: "steam", label: "Steam Group", url: null, icon: Gamepad2 },
  { id: "youtube", label: "YouTube", url: null, icon: PlaySquare },
  { id: "facebook", label: "Facebook", url: null, icon: Share2 },
  { id: "instagram", label: "Instagram", url: null, icon: Camera },
  { id: "x", label: "X", url: null, icon: Radio },
  { id: "other", label: "Community Link", url: null, icon: Globe2 },
];

export function getConfiguredSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => Boolean(link.url));
}
