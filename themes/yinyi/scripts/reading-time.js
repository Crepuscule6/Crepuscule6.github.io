'use strict';

hexo.extend.helper.register('estimated_reading_minutes', function (content) {
  const text = this.strip_html(String(content || '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' '));
  const chineseCharacters = (text.match(/\p{Script=Han}/gu) || []).length;
  const words = (text.replace(/\p{Script=Han}/gu, ' ')
    .match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
  return Math.max(1, Math.ceil(chineseCharacters / 300 + words / 200));
});
