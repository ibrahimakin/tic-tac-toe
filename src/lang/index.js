export const lang_xox = {
    tr: {
        next_player: 'Sıradaki Oyuncu: ',
        go_to_start: 'Oyun başlangıcına git',
        go_to_move: 'Hamleye git #',
        winner: 'Kazanan: ',
        draw: 'Berabere'
    },
    en: {
        next_player: 'Next Player: ',
        go_to_start: 'Go to game start',
        go_to_move: 'Go to move #',
        winner: 'Winner: ',
        draw: 'Draw'
    }
};

export function getLangXOX() {
    let localLang;
    try { localLang = localStorage.getItem('lang'); }
    catch (e) { }
    return localLang === 'tr' ? 'tr' : 'en';
}