export const lang_xox = {
    tr: {
        next_player: 'Sıradaki Oyuncu: ',
        first_player: 'İlk Oyuncu: ',
        go_to_start: 'Oyun başlangıcına git',
        go_to_move: 'Hamleye git #',
        start: 'Oyun başlangıcı',
        move: 'Hamle #',
        winner: 'Kazanan: ',
        draw: 'Berabere'
    },
    en: {
        next_player: 'Next Player: ',
        first_player: 'First Player: ',
        go_to_start: 'Go to game start',
        go_to_move: 'Go to move #',
        start: 'Game start',
        move: 'Move #',
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