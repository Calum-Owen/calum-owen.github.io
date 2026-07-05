---
layout: page
title: Recipes
permalink: /recipes/
---

# Recipes

This collection will contain recipe pages. For now there are placeholders you can edit in the `_recipes/` folder.

<!-- List recipes -->
<ul>
  {% for recipe in site.recipes %}
    <li><a href="{{ recipe.url }}">{{ recipe.title }}</a> — {{ recipe.excerpt }}</li>
  {% endfor %}
</ul>

