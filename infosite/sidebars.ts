import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';


const sidebars: SidebarsConfig = {
  
  EngineeringTutorialsSidebar: [
    'Tutorials/Welcome-Tutorials',


    {
      type: 'category',
      label: 'Tutorials',
      items: ['Tutorials/Welcome-Tutorials'],
    },
  ],

  ResearchSidebar: [
    
    'Research/ActivityStreams',
    'Research/gQuic',
    'Research/HLSStreaming',
    'Research/OpenRan',
    'Research/RiscV',
    'Research/ActivityPlex/ProtocolSpecs',
    {
      type: 'category',
      label: 'Research',
      items: ['Research/ActivityPlex/ProtocolSpecs'],
    },
  ],

  
   
};

export default sidebars;
