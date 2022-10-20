# z-index

<p class="description">z-index é a propriedade CSS que ajuda a controlar o leiaute, fornecendo um terceiro eixo para organizar o conteúdo.</p>

Vários componentes do Material-UI utiliza `z-index`, empregando uma escala z-index padrão em Material-UI, que foi projetada para adequar camadas de drawers, modais, snackbars, dicas, e muito mais.

The `z-index` values start at an arbitrary number, high and specific enough to ideally avoid conflicts:

- assistente mobile: 1000
- acesso rápido: 1050
- barra de aplicativos: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- dica: 1500

Esses valores sempre podem ser customizados. Você os encontrará no tema sob a chave [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) do objeto de tema. Customização de valores individuais não é recomendada; se você deve mudar um, você provavelmente precisará mudar todos eles.
