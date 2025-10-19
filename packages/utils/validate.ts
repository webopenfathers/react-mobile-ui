// 检测一个值是否是一个Promise
export function isPromise(obj: unknown): obj is Promise<unknown> {
  return !!obj && typeof obj === 'object' && typeof (obj as any).then === 'function';
}
