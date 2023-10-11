import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date().getTime();
  const createdDate = new Date(createdAt).getTime();
  const timeDifference = now - createdDate;

  const minutes = Math.floor(timeDifference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months =
    new Date(now).getMonth() -
    new Date(createdDate).getMonth() +
    12 * (new Date(now).getFullYear() - new Date(createdDate).getFullYear());
  const years =
    new Date(now).getFullYear() - new Date(createdDate).getFullYear();

  if (years > 0) {
    return `${years} year ago`;
  } else if (months > 0) {
    return `${months} month ago`;
  } else if (weeks > 0) {
    return `${weeks} week ago`;
  } else if (days > 0) {
    return `${days} day ago`;
  } else if (hours > 0) {
    return `${hours} hour ago`;
  } else if (minutes > 0) {
    return `${minutes} minute ago`;
  } else {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} second ago`;
  }
};

export const formatAndDivideNumber = (number: number): string => {
  if (number >= 1000000) {
    return number / 1000000 + "M";
  } else if (number >= 1000) {
    return number / 1000 + "K";
  } else {
    return number.toString();
  }
};
