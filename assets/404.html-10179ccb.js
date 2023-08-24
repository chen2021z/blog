import{_ as n,o as s,c as a,a as t}from"./app-03ffc0c7.js";const e={},p=t(`<p>在Vue中，可以使用路由配置和导航守卫来实现重定向到404页面。</p><p>首先，在路由配置文件（通常是router.js或index.js）中，添加一个用于处理404的路由规则：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/views/NotFound.vue&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里将路径设置为<code>&#39;*&#39;</code>，表示匹配所有未定义的路由。</p><p>然后，在导航守卫中，使用<code>beforeEach</code>钩子来捕获路由不存在的情况，并将其重定向到404页面：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>matched<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里通过检查<code>to.matched.length</code>是否为0来确定路由是否存在匹配项。如果没有匹配项，则执行<code>next(&#39;/404&#39;)</code>将路由重定向到指定的404页面。</p><p>请确保在Vue项目中创建了对应的404组件（例如，NotFound.vue），并正确配置路由和导航守卫。</p>`,8),o=[p];function c(i,u){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","404.html.vue"]]);export{r as default};
