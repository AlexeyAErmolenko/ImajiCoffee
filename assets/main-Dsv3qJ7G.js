(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const a="https://699f184378dda56d396c5fee.mockapi.io/products";class b{async getAll(e={}){try{const r=new URL(a);Object.keys(e).forEach(o=>{e[o]!==void 0&&e[o]!=="all"&&e[o]!==""&&r.searchParams.append(o,e[o])});const c=await fetch(r);if(!c.ok)throw new Error(`HTTP error! status: ${c.status}`);return await c.json()}catch(r){return console.error("ApiService.getAll failed:",r),[]}}async getById(e){try{const r=await fetch(`${a}/${e}`);if(!r.ok)throw new Error("Product not found");return await r.json()}catch(r){return console.error(`ApiService.getById(${e}) failed:`,r),null}}async create(e){try{const r=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok)throw new Error("Failed to create");return await r.json()}catch(r){return console.error("ApiService.create failed:",r),null}}async update(e,r,c=!1){try{const o=await fetch(`${a}/${e}`,{method:c?"PATCH":"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!o.ok)throw new Error("Failed to update data item");return await o.json()}catch(o){return console.error(`ApiService.update(${e}) failed:`,o),null}}async delete(e){try{if(!(await fetch(`${a}/${e}`,{method:"DELETE"})).ok)throw new Error("Failed to delete data item");return!0}catch(r){return console.error(`ApiService.delete(${e}) failed:`,r),!1}}}const h=new b(a),l=document.querySelector(".list_products"),y=document.querySelector(".tabs"),m=document.querySelector(".filter_form"),v=document.querySelector("#search-input"),S=document.querySelector("#price-selector"),w=document.querySelector("#sort-selector"),g=document.querySelector(".empty_list_products");let $=[],f="beverage",d="",i="all",u="best-selling";const P=t=>{l.innerHTML="";const e=t.filter(r=>{const c=parseFloat(r.price);return i==="all"?!0:i==="0-10"?c<10:i==="10-plus"?c>=10:!0});e.length>0?(g.classList.add("visually_hidden"),l.innerHTML=e.map(r=>L(r)).join("")):g.classList.remove("visually_hidden")},n=async()=>{const t={category:f};switch(d.trim()!==""&&(t.name=d.trim()),u){case"price-asc":t.sortBy="price",t.order="asc";break;case"price-desc":t.sortBy="price",t.order="desc";break;case"newest":t.sortBy="createdAt",t.order="desc";break}try{const e=await h.getAll(t);u==="best-selling"&&e.sort((r,c)=>Number(c.isBestSelling)-Number(r.isBestSelling)),P(e)}catch(e){console.error("Failed to load products:",e),l.innerHTML="<li>Error loading menu. Please try again later.</li>"}};v.addEventListener("input",t=>{d=t.target.value,n()});y.addEventListener("click",t=>{const e=t.target.closest("button");if(!e)return;const r=e.dataset.category;r&&(y.querySelectorAll(".tabs button").forEach(c=>c.setAttribute("aria-selected","false")),e.setAttribute("aria-selected","true"),f=r,n())});m.addEventListener("change",t=>{const e=t.target.closest("select");e&&(e.id==="price-selector"&&(i=e.value),e.id==="sort-selector"&&(u=e.value),n())});m.addEventListener("click",t=>{const e=t.target.closest("button[data-clear]");if(!e)return;const r=e.dataset.clear;r==="search"&&(v.value="",d=""),r==="price"&&(S.value="all",i="all"),r==="sort"&&(w.value="best-selling",u="best-selling"),n()});const L=t=>{const e=typeof t.price=="number"?t.price:parseFloat(t.price)||0,r=t.originalPrice?parseFloat(t.originalPrice):null;return`
    <li class="product_card" data-category="${t.category}">
      <article>
        <div class="product_image">
          <img src="${t.image}" alt="${t.alt}" width="300" height="300">
          ${t.inStock?"":`<img class="overlay" src="https://res.cloudinary.com/dserfv7z4/image/upload/v1770373518/overlayOutOfStock_mxenki.png"
            alt="25 percent transparent black overlay" width="300" height="300">`}
        </div>
        <div class="product_card_name">
          <h3>${t.name}</h3>
          <p>${t.availability}</p>
        </div>
        <div class="price-promo">
          <div class="price">
            <p>$${e.toFixed(2)}</p>
            ${r!=null?`<p class="crossed_out">$${r.toFixed(2)}</p>`:""}
          </div>
          ${t.isPromo?'<p class="promo">Get 20% Off in App</p>':""}
        </div>
        ${t.inStock?"":`<div class="out_of_stock_badge">
          <p>Out of Stock</p>
          </div>`}
        ${t.onSale?'<p class="sale_badge">sale</p>':""}
      </article>
    </li>
  `};async function A(t={category:f}){try{$=await h.getAll(),n()}catch(e){console.error("Failed to load products:",e),l.innerHTML="<p>Error loading menu</p>"}}document.addEventListener("DOMContentLoaded",A);
//# sourceMappingURL=main-Dsv3qJ7G.js.map
