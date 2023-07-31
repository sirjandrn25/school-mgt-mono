"use client";
import './style.css'


export const Button = ({ children }: any) => {
  return <button className="btn btn-primary" onClick={() => alert("boop")}>{children}</button>;
};
