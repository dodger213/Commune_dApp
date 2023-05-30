// from the position within the page determine if the header 
// should be rounded, and shadowed using tailwindcss classes
export const getHeaderClasses = (position: number, height: number) => {
    if ( position > (height / 2) ) {
        return 'rounded-b-lg shadow-lg mx-5';
    }
    return '';
}
