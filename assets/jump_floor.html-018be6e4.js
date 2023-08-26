import{_ as n,o as s,c as a,a as e}from"./app-3d808c28.js";const p={},t=e(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 青蛙跳台阶 </span>
<span class="token keyword">function</span> <span class="token function">jumpFloor</span><span class="token punctuation">(</span><span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token builtin">number</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token builtin">number</span> <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">2</span>

  <span class="token keyword">let</span> prev <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 前一个</span>
  <span class="token keyword">let</span> next <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 后一个</span>
  <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token builtin">number</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    sum <span class="token operator">=</span> prev <span class="token operator">+</span> next<span class="token punctuation">;</span>
    prev <span class="token operator">=</span> next<span class="token punctuation">;</span>
    next <span class="token operator">=</span> sum<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=[t];function c(l,i){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","jump_floor.html.vue"]]);export{u as default};