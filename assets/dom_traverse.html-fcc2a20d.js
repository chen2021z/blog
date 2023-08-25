import{_ as n,o as s,c as a,a as t}from"./app-bd35fb3a.js";const p={},o=t(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//遍历单个节点</span>
<span class="token keyword">function</span> <span class="token function">visitNode</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token keyword">instanceof</span> <span class="token class-name">Comment</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//注释节点</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Comment--&quot;</span><span class="token punctuation">,</span> node<span class="token punctuation">.</span>textContent<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token keyword">instanceof</span> <span class="token class-name">Text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//文本节点</span>
    <span class="token keyword">let</span> t <span class="token operator">=</span> node<span class="token punctuation">.</span>textContent<span class="token operator">?.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Text--&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token keyword">instanceof</span> <span class="token class-name">HTMLElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// element</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Element--&quot;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>node<span class="token punctuation">.</span>tagName<span class="token punctuation">.</span><span class="token function">toLocaleLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 深度优先遍历dom--递归
 * <span class="token keyword">@param</span> <span class="token parameter">root</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">deepFirstTraverse</span><span class="token punctuation">(</span>root<span class="token operator">:</span> Node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">visitNode</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> childNodes <span class="token operator">=</span> root<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span> <span class="token comment">//获取子节点</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>childNodes<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    childNodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>curNode<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">deepFirstTraverse</span><span class="token punctuation">(</span>curNode<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//递归</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 深度优先先遍历dom--非递归、栈
 * <span class="token keyword">@param</span> <span class="token parameter">root</span> 
 */</span>
<span class="token keyword">function</span> <span class="token function">deepFirstTraverse2</span><span class="token punctuation">(</span>root<span class="token operator">:</span> Node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> stack<span class="token operator">:</span>Node<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> curNode <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>curNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token function">visitNode</span><span class="token punctuation">(</span>curNode<span class="token punctuation">)</span>
    <span class="token keyword">const</span> childs <span class="token operator">=</span> curNode<span class="token punctuation">.</span>childNodes
    <span class="token builtin">Array</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>childs<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>child <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 广度优先遍历，通过队列
 * <span class="token keyword">@param</span> <span class="token parameter">root</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">breadthFirstTraverse</span><span class="token punctuation">(</span>root<span class="token operator">:</span> Node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> queue<span class="token operator">:</span> Node<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">//根节点入队</span>
  queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 头节点出队</span>
    <span class="token keyword">const</span> curNode <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>curNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>

    <span class="token function">visitNode</span><span class="token punctuation">(</span>curNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//头的子节点入队</span>
    <span class="token keyword">const</span> childNodes <span class="token operator">=</span> curNode<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>childNodes<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      childNodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),e=[o];function c(i,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","dom_traverse.html.vue"]]);export{k as default};
