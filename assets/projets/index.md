---
layout: null
permalink: /assets/projets/index.html
---
{% for fichier in site.static_files %}{% if fichier.path contains '/assets/projets/' and fichier.extname == '.png' %}
<a href="{{ fichier.path | remove_first: '/assets/projets/' | escape }}">{{ fichier.name | escape }}</a>
{% endif %}{% endfor %}
