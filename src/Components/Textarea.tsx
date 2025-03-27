import { createEffect, JSX, on, onMount } from "solid-js";

export function Textarea(
  props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  let taRef!: HTMLTextAreaElement;
  createEffect(
    on(
      () => taRef.value,
      () => {
        if (taRef) {
          taRef.style.height = "auto";
          taRef.style.height = taRef.scrollHeight + "px";
        }
      }
    )
  );
  onMount(() => {
    taRef.addEventListener("input", () => {
      taRef.style.height = taRef.scrollHeight + "px";
    });
  });
  return <textarea {...props} ref={taRef}></textarea>;
}
