'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count++;
  });
  document.getElementById('filter-status').textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}.`;
}));

document.documentElement.classList.add('js');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const projectDialog = document.getElementById('project-dialog');
document.querySelectorAll('.project').forEach(project => {
  const details = project.querySelector('details');
  if (!details || !projectDialog.showModal) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'project-open';
  button.textContent = 'Voir les détails →';
  button.setAttribute('aria-label', `Voir les détails : ${project.querySelector('h3').textContent}`);
  button.addEventListener('click', () => {
    document.getElementById('dialog-title').textContent = project.querySelector('h3').textContent;
    const content = document.getElementById('dialog-content');
    content.replaceChildren();
    content.append(project.querySelector('.project-body > p:not(.label)').cloneNode(true));
    content.append(project.querySelector('.tags').cloneNode(true));
    [...details.children].filter(child => child.tagName !== 'SUMMARY').forEach(child => content.append(child.cloneNode(true)));
    projectDialog.showModal();
    document.body.classList.add('dialog-open');
  });
  details.hidden = true;
  details.after(button);
});
document.getElementById('close-dialog').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
projectDialog.addEventListener('click', event => {
  if (event.target !== projectDialog) return;
  const bounds = projectDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) projectDialog.close();
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', event => {
  if (location.protocol === 'file:') {
    event.preventDefault();
    document.getElementById('contact-status').textContent = 'Pour envoyer ce formulaire, ouvrez la version publiée du portfolio. Vous pouvez aussi utiliser le lien mail ci-contre.';
  }
});
