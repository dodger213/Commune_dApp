const modulesList = [{
    name: 'module1',
    description: 'The first module',
}, {
    name: 'Module 2',
    description: 'Another of our modulesassssssssssssssssssssssdadasdaddafav fsdgaergehr rffffffffffffffffffffffffff 234324563t25 gfegdf',
}, {
    name: 'Module 3',
    description: 'modulesassssssssssssssssssssssdadasdaddafav ',
}, {
    name: 'Module 4',
    description: 'Another of our  fsdgaergehr',
}, {
    name: 'Module 5',
    description: 'rffffffffffffffffffffffffff ',
}, {
    name: 'Module 6',
    description: '234324563t25',
}, {
    name: 'Module 7',
    description: 'gfegdf',
}, {
    name: 'Module 8',
    description: '99999999999',
}];

export default class ModulesService {
    static getModulesList = async (searchQuery = '') => {
        if (!searchQuery) {
            return modulesList;
        }
        
        return modulesList.filter(module =>
            module.name.includes(searchQuery)
            || module.description.includes(searchQuery)
        )
    }
}