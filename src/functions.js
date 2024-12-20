import moment from 'moment';

export function msFormatter(ms) {
    if (!ms) return '0 h';
    let hours = String( Math.floor( ( ms / (1000 * 60 * 60) ) % 24 ) );
    return hours + " h";
}

export function formatAjankohta(start_date, due_date) {
    let start_date_formatted = moment(start_date, "x").format('D.M.YYYY');
    let due_date_formatted = moment(due_date, "x").format('D.M.YYYY');

    if (start_date_formatted === due_date_formatted) {
        return start_date_formatted;
    } else {
        let start_date_formatted_dm = moment(start_date, "x").format('M');
        let due_date_formatted_dm = moment(due_date, "x").format('M');
        if (start_date_formatted_dm === due_date_formatted_dm) {
            return moment(start_date, "x").format('D.') + '–' + due_date_formatted;
        } else {
            return moment(start_date, "x").format('D.M.') + '–' + due_date_formatted;
        }
    }
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default { msFormatter, formatAjankohta, capitalizeFirstLetter };
