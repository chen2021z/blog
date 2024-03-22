import{_ as n,o as s,c as a,e as p}from"./app-84d7f4b0.js";const t={},e=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span><span class="token string">&#39;l-1&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span><span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span><span class="token string">&#39;l-2&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span><span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span><span class="token string">&#39;l-1-1&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span><span class="token number">1</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span><span class="token string">&#39;l-1-2&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span><span class="token number">2</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span><span class="token string">&#39;l-1-2-1&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span><span class="token number">4</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">6</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span><span class="token string">&#39;l-1-2-1-1&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span><span class="token number">5</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token keyword">function</span> <span class="token function">arrToTree</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// 遍历，存储每个节点的引用</span>
  data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    map<span class="token punctuation">[</span>item<span class="token punctuation">.</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> item
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> parent <span class="token operator">=</span> map<span class="token punctuation">[</span>item<span class="token punctuation">.</span>parentId<span class="token punctuation">]</span>
    <span class="token comment">// 还需判断是否需要添加children属性</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>children <span class="token operator">||</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
      result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token function">arrToTree</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=[e];function l(c,i){return s(),a("div",null,o)}const u=n(t,[["render",l],["__file","array_to_tree.html.vue"]]);export{u as default};
