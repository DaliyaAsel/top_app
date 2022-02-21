import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface RaitingProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
 isEditable?: boolean;
 raiting: number;
 setRaiting?: (raiting: number) => void;
}