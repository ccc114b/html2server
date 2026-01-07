---
title: "TeX 數學式測試"
date: "2024-01-16"
author: "數學 AI"
description: "完整的 TeX 數學式呈現測試，包含各種數學符號和公式"
tags: ["數學", "TeX", "測試", "公式"]
---

# TeX 數學式完整測試

這篇文章測試各種 TeX 數學式的呈現效果，確保支援複雜的數學表達式。

## 基本數學符號

### 行內數學式
基本數學運算：$a + b = c$，$x^2 + y^2 = z^2$，$\frac{a}{b} = c$。

希臘字母：$\alpha$, $\beta$, $\gamma$, $\delta$, $\pi$, $\theta$, $\sigma$。

上下標：$x_i$, $x^2$, $x_i^2$, $\sum_{i=1}^{n}$。

### 區塊數學式
二次公式：
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

圓面積公式：
$$A = \pi r^2$$

## 進階數學表達式

### 微積分
導數表示：
$$\frac{dy}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

積分：
$$\int_{a}^{b} f(x) dx = F(b) - F(a)$$

多變數微積分：
$$\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$$

### 線性代數
矩陣表示：
$$\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}$$

向量運算：
$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos\theta$$

行列式：
$$\det(A) = \begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc$$

### 機率與統計
常態分佈：
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$$

期望值：
$$E[X] = \sum_{i=1}^{n} x_i P(X = x_i)$$

變異數：
$$\text{Var}(X) = E[(X - \mu)^2] = \sigma^2$$

## 複雜數學結構

### 分數與根式
複雜分數：
$$\frac{\frac{a}{b} + \frac{c}{d}}{\frac{e}{f} - \frac{g}{h}}$$

多重根式：
$$\sqrt{\sqrt[3]{x^2 + \sqrt{y^3 + 1}}}$$

### 求和與連乘
雙重求和：
$$\sum_{i=1}^{n} \sum_{j=1}^{m} a_{ij} b_{ij}$$

無限級數：
$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$$

連乘：
$$\prod_{i=1}^{n} x_i = x_1 \cdot x_2 \cdot \ldots \cdot x_n$$

### 極限與收斂
極限：
$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$$

泰勒級數：
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$$

## 特殊數學符號

### 集合論
聯集與交集：
$$A \cup B = \{x | x \in A \text{ 或 } x \in B\}$$
$$A \cap B = \{x | x \in A \text{ 且 } x \in B\}$$

屬於符號：$x \in A$, $x \notin A$

子集：$A \subseteq B$, $A \subsetneq B$

### 邏輯符號
邏輯蘊含：$P \Rightarrow Q$

邏輯等價：$P \Leftrightarrow Q$

存在與任意量詞：$\exists x$, $\forall x$

### 物理學公式
愛因斯坦質能方程：
$$E = mc^2$$

理想氣體定律：
$$PV = nRT$$

牛頓第二定律：
$$F = ma$$

## 數學表格與對齊

### 方程組
線性方程組：
$$\begin{cases}
2x + 3y = 7 \\
4x - y = 1
\end{cases}$$

### 矩陣運算
矩陣乘法：
$$\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
=
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}$$

## 測試結果總結

✅ **基本符號**：數學運算符、希臘字母、上下標
✅ **進階表達式**：微積分、線性代數、機率統計  
✅ **複雜結構**：分數、根式、求和、級數
✅ **特殊符號**：集合論、邏輯、物理公式
✅ **排版效果**：行內與區塊數學式、方程組、矩陣

這個測試證實了本部落格完全支援 TeX 數學式的呈現，無論是簡單的行內公式還是複雜的數學表達式都能正確顯示。