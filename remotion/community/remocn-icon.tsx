// Authored for this project (not a remocn file): ONE catalog entry for all 100 remocn icons (`remocn_icon`).
// Each icon file under ./icons is verbatim; this map picks one by name. The layer box is the icon (sizeMode props: width → size).
import type { ComponentType } from "react";
import type { IconAnimationProps } from "./remocn-icons";
import { CheckIcon } from "./icons/icon-check";
import { CheckCircleIcon } from "./icons/icon-check-circle";
import { XIcon } from "./icons/icon-x";
import { AlertTriangleIcon } from "./icons/icon-alert-triangle";
import { InfoIcon } from "./icons/icon-info";
import { LoaderIcon } from "./icons/icon-loader";
import { RefreshCwIcon } from "./icons/icon-refresh-cw";
import { ShieldIcon } from "./icons/icon-shield";
import { HelpCircleIcon } from "./icons/icon-help-circle";
import { PlusCircleIcon } from "./icons/icon-plus-circle";
import { XCircleIcon } from "./icons/icon-x-circle";
import { SearchIcon } from "./icons/icon-search";
import { BellIcon } from "./icons/icon-bell";
import { DownloadIcon } from "./icons/icon-download";
import { UploadIcon } from "./icons/icon-upload";
import { CopyIcon } from "./icons/icon-copy";
import { SettingsIcon } from "./icons/icon-settings";
import { TrashIcon } from "./icons/icon-trash";
import { PlusIcon } from "./icons/icon-plus";
import { SendIcon } from "./icons/icon-send";
import { MenuIcon } from "./icons/icon-menu";
import { MoreHorizontalIcon } from "./icons/icon-more-horizontal";
import { MaximizeIcon } from "./icons/icon-maximize";
import { LayoutGridIcon } from "./icons/icon-layout-grid";
import { PencilIcon } from "./icons/icon-pencil";
import { Share2Icon } from "./icons/icon-share-2";
import { FilterIcon } from "./icons/icon-filter";
import { EyeIcon } from "./icons/icon-eye";
import { EyeOffIcon } from "./icons/icon-eye-off";
import { SaveIcon } from "./icons/icon-save";
import { LinkIcon } from "./icons/icon-link";
import { BookmarkIcon } from "./icons/icon-bookmark";
import { LockIcon } from "./icons/icon-lock";
import { KeyIcon } from "./icons/icon-key";
import { LogOutIcon } from "./icons/icon-log-out";
import { PlayIcon } from "./icons/icon-play";
import { PauseIcon } from "./icons/icon-pause";
import { SkipForwardIcon } from "./icons/icon-skip-forward";
import { Volume2Icon } from "./icons/icon-volume-2";
import { VolumeXIcon } from "./icons/icon-volume-x";
import { MicIcon } from "./icons/icon-mic";
import { VideoIcon } from "./icons/icon-video";
import { CameraIcon } from "./icons/icon-camera";
import { ImageIcon } from "./icons/icon-image";
import { UserIcon } from "./icons/icon-user";
import { UsersIcon } from "./icons/icon-users";
import { UserPlusIcon } from "./icons/icon-user-plus";
import { MailIcon } from "./icons/icon-mail";
import { MessageCircleIcon } from "./icons/icon-message-circle";
import { PhoneIcon } from "./icons/icon-phone";
import { AtSignIcon } from "./icons/icon-at-sign";
import { InboxIcon } from "./icons/icon-inbox";
import { CalendarIcon } from "./icons/icon-calendar";
import { ClockIcon } from "./icons/icon-clock";
import { TimerIcon } from "./icons/icon-timer";
import { HomeIcon } from "./icons/icon-home";
import { FolderIcon } from "./icons/icon-folder";
import { FileTextIcon } from "./icons/icon-file-text";
import { CodeIcon } from "./icons/icon-code";
import { TerminalIcon } from "./icons/icon-terminal";
import { DatabaseIcon } from "./icons/icon-database";
import { CloudIcon } from "./icons/icon-cloud";
import { GlobeIcon } from "./icons/icon-globe";
import { MonitorIcon } from "./icons/icon-monitor";
import { SmartphoneIcon } from "./icons/icon-smartphone";
import { SunIcon } from "./icons/icon-sun";
import { MoonIcon } from "./icons/icon-moon";
import { ShoppingCartIcon } from "./icons/icon-shopping-cart";
import { CreditCardIcon } from "./icons/icon-credit-card";
import { DollarSignIcon } from "./icons/icon-dollar-sign";
import { TagIcon } from "./icons/icon-tag";
import { PackageIcon } from "./icons/icon-package";
import { GiftIcon } from "./icons/icon-gift";
import { WalletIcon } from "./icons/icon-wallet";
import { ActivityIcon } from "./icons/icon-activity";
import { BarChart3Icon } from "./icons/icon-bar-chart-3";
import { TargetIcon } from "./icons/icon-target";
import { TrendingDownIcon } from "./icons/icon-trending-down";
import { TrendingUpIcon } from "./icons/icon-trending-up";
import { HeartIcon } from "./icons/icon-heart";
import { RocketIcon } from "./icons/icon-rocket";
import { TrophyIcon } from "./icons/icon-trophy";
import { AwardIcon } from "./icons/icon-award";
import { CrownIcon } from "./icons/icon-crown";
import { GemIcon } from "./icons/icon-gem";
import { StarIcon } from "./icons/icon-star";
import { SparklesIcon } from "./icons/icon-sparkles";
import { ZapIcon } from "./icons/icon-zap";
import { FlameIcon } from "./icons/icon-flame";
import { ThumbsUpIcon } from "./icons/icon-thumbs-up";
import { PartyPopperIcon } from "./icons/icon-party-popper";
import { ArrowRightIcon } from "./icons/icon-arrow-right";
import { ArrowLeftIcon } from "./icons/icon-arrow-left";
import { ArrowUpIcon } from "./icons/icon-arrow-up";
import { ArrowDownIcon } from "./icons/icon-arrow-down";
import { ExternalLinkIcon } from "./icons/icon-external-link";
import { ChevronUpIcon } from "./icons/icon-chevron-up";
import { ChevronDownIcon } from "./icons/icon-chevron-down";
import { ChevronLeftIcon } from "./icons/icon-chevron-left";
import { ChevronRightIcon } from "./icons/icon-chevron-right";

export const REMOCN_ICONS: Record<string, ComponentType<IconAnimationProps>> = {
  "check": CheckIcon,
  "check-circle": CheckCircleIcon,
  "x": XIcon,
  "alert-triangle": AlertTriangleIcon,
  "info": InfoIcon,
  "loader": LoaderIcon,
  "refresh-cw": RefreshCwIcon,
  "shield": ShieldIcon,
  "help-circle": HelpCircleIcon,
  "plus-circle": PlusCircleIcon,
  "x-circle": XCircleIcon,
  "search": SearchIcon,
  "bell": BellIcon,
  "download": DownloadIcon,
  "upload": UploadIcon,
  "copy": CopyIcon,
  "settings": SettingsIcon,
  "trash": TrashIcon,
  "plus": PlusIcon,
  "send": SendIcon,
  "menu": MenuIcon,
  "more-horizontal": MoreHorizontalIcon,
  "maximize": MaximizeIcon,
  "layout-grid": LayoutGridIcon,
  "pencil": PencilIcon,
  "share-2": Share2Icon,
  "filter": FilterIcon,
  "eye": EyeIcon,
  "eye-off": EyeOffIcon,
  "save": SaveIcon,
  "link": LinkIcon,
  "bookmark": BookmarkIcon,
  "lock": LockIcon,
  "key": KeyIcon,
  "log-out": LogOutIcon,
  "play": PlayIcon,
  "pause": PauseIcon,
  "skip-forward": SkipForwardIcon,
  "volume-2": Volume2Icon,
  "volume-x": VolumeXIcon,
  "mic": MicIcon,
  "video": VideoIcon,
  "camera": CameraIcon,
  "image": ImageIcon,
  "user": UserIcon,
  "users": UsersIcon,
  "user-plus": UserPlusIcon,
  "mail": MailIcon,
  "message-circle": MessageCircleIcon,
  "phone": PhoneIcon,
  "at-sign": AtSignIcon,
  "inbox": InboxIcon,
  "calendar": CalendarIcon,
  "clock": ClockIcon,
  "timer": TimerIcon,
  "home": HomeIcon,
  "folder": FolderIcon,
  "file-text": FileTextIcon,
  "code": CodeIcon,
  "terminal": TerminalIcon,
  "database": DatabaseIcon,
  "cloud": CloudIcon,
  "globe": GlobeIcon,
  "monitor": MonitorIcon,
  "smartphone": SmartphoneIcon,
  "sun": SunIcon,
  "moon": MoonIcon,
  "shopping-cart": ShoppingCartIcon,
  "credit-card": CreditCardIcon,
  "dollar-sign": DollarSignIcon,
  "tag": TagIcon,
  "package": PackageIcon,
  "gift": GiftIcon,
  "wallet": WalletIcon,
  "activity": ActivityIcon,
  "bar-chart-3": BarChart3Icon,
  "target": TargetIcon,
  "trending-down": TrendingDownIcon,
  "trending-up": TrendingUpIcon,
  "heart": HeartIcon,
  "rocket": RocketIcon,
  "trophy": TrophyIcon,
  "award": AwardIcon,
  "crown": CrownIcon,
  "gem": GemIcon,
  "star": StarIcon,
  "sparkles": SparklesIcon,
  "zap": ZapIcon,
  "flame": FlameIcon,
  "thumbs-up": ThumbsUpIcon,
  "party-popper": PartyPopperIcon,
  "arrow-right": ArrowRightIcon,
  "arrow-left": ArrowLeftIcon,
  "arrow-up": ArrowUpIcon,
  "arrow-down": ArrowDownIcon,
  "external-link": ExternalLinkIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
};

export const REMOCN_ICON_NAMES = Object.keys(REMOCN_ICONS);

export function RemocnIcon({ icon = "check", width, height: _height, size, ...rest }: IconAnimationProps & { icon?: string; width?: number; height?: number }) {
  const Icon = REMOCN_ICONS[icon] ?? REMOCN_ICONS.check;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon {...rest} size={size ?? width ?? 48} />
    </div>
  );
}
