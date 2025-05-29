const devopsSkills = [
  'Jenkins', 'Git', 'AWS', 'SonarQube', 'Docker', 'Maven', 'Kubernetes',
  'Terraform', 'NewRelic', 'Ansible', 'Synk', 'Nexus', 'JFrog',
  'GitHub', 'Python', 'SAP ABAP', 'Azure DevOps', 'Google Cloud',
  'Prometheus', 'Grafana'
];

TagCloud('.tagcloud-container', devopsSkills, {
  radius: 230,
  maxSpeed: 'fast',
  initSpeed: 'slow',
  direction: 135,
  keep: true
});
