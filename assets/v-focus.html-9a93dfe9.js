import{_ as n,o as s,c as a,e as t}from"./app-0ccd9946.js";const p={},e=t(`<div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-focus</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">focus</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 指令的定义</span>
      <span class="token function">inserted</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 元素插入到 DOM 后设置焦点</span>
        el<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> binding</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当指令所在组件的 VNode 更新时可能会调用 update 钩子函数</span>
        <span class="token comment">// 可以根据需要来判断是否要设置焦点</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>binding<span class="token punctuation">.</span>value <span class="token operator">!==</span> binding<span class="token punctuation">.</span>oldValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          el<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">unbind</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当指令与元素解绑时调用</span>
        <span class="token comment">// 可以在此处执行一些清理工作（如果需要）</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),c=[e];function o(l,i){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","v-focus.html.vue"]]);export{d as default};
