import{_ as e,r as t,o as p,c as o,a as n,b as s,d as c,e as l}from"./app-94df71c8.js";const i={},u=l(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><blockquote><p>单例模式：限制类实例化次数只能一次，一个类只有一个实例，并提供一个访问它的全局访问点。</p></blockquote><p>单例模式是创建型设计模式的一种。针对全局仅需一个对象的场景，如线程池、全局缓存、window 对象等。</p><h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2><ol><li>类只有一个实例</li><li>全局可访问该实例</li><li>自行实例化（主动实例化）</li><li>可推迟初始化，即延迟执行（与静态类/对象的区别）</li></ol><h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2><p>希望通过一个工具函数 singleton()，将我们普通的构造函数进行改造，返回一个新构造函数，新构造函数具备单例模式的特点。</p><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><p>普通的Normal构造函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Normal</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;this is a Normal single&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Normal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./Normal.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> n1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Normal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Normal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 打印两句&quot;this is a Normal single&quot;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n1 <span class="token operator">===</span> n2<span class="token punctuation">)</span>  <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="简单改造" tabindex="-1"><a class="header-anchor" href="#简单改造" aria-hidden="true">#</a> 简单改造</h3><p>工具函数singleton</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">singleton</span><span class="token punctuation">(</span><span class="token parameter">className</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> instance<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">className</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过singleton进行简单改造，如已存在实例，则返回已创造过的实例</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> singleton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./singleton.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Normal</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;this is a Normal single&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> newNormal <span class="token operator">=</span> <span class="token function">singleton</span><span class="token punctuation">(</span>Normal<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> newNormal <span class="token keyword">as</span> Normal <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次测试</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Normal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./Normal.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> n1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Normal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Normal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 打印一句&quot;this is a Normal single&quot;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n1 <span class="token operator">===</span> n2<span class="token punctuation">)</span>  <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存在问题" tabindex="-1"><a class="header-anchor" href="#存在问题" aria-hidden="true">#</a> 存在问题</h3><p>此时我们n1/n2的原型对象并非Normal.prototype，如果我们再其原型上绑定方法，对应实例找不到对应方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Normal</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">play</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;play&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
n1<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// TypeError: n1.play is not a function</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时应该使singleton函数返回代理Proxy，而不是一个新的class！</p><h3 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h3><blockquote><p>Talk is cheap, show you my code.</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">singleton</span><span class="token punctuation">(</span><span class="token parameter">className</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> instance<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>className<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// handler.construct() 方法用于拦截 new 操作符</span>
    <span class="token function">construct</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> argumentsList</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">target</span><span class="token punctuation">(</span>argumentsList<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> singleton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./singleton.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Normal</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;this is a Normal single&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> newNormal <span class="token operator">=</span> <span class="token function">singleton</span><span class="token punctuation">(</span>Normal<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> newNormal <span class="token keyword">as</span> Normal <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Normal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./Normal.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> n1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Normal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// this is a Normal single</span>
<span class="token keyword">const</span> n2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Normal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token class-name">Normal</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">play</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;play&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
n1<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// play</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,29),r={id:"mdn",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#mdn","aria-hidden":"true"},"#",-1),k={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct",target:"_blank",rel:"noopener noreferrer"},v=n("h3",{id:"-1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#-1","aria-hidden":"true"},"#")],-1);function m(b,h){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("h3",r,[d,s(),n("a",k,[s("mdn"),c(a)])]),v])}const y=e(i,[["render",m],["__file","sIngleton.html.vue"]]);export{y as default};
