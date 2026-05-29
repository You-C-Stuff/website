// ════════════════════════════════════════════════════════════════════════════
// data.js — all content arrays
// Edit these to add/remove entries. Logic lives in myScript.js.
// ════════════════════════════════════════════════════════════════════════════

// ── FANART GALLERIES ─────────────────────────────────────────────────────────
// link types: 'twitch' | 'twitter' | 'instagram' | 'bluesky' | 'youtube' | 'carrd'
// img  = full carousel image
// thumb = thumbnail (can differ from img — e.g. gif vs static frame)
const FANART_GALLERIES = [
    {
        label: 'FANART',
        artists: [
            { name: 'Lucielledream',    img: 'Images/Fanart/Luci.png',          thumb: 'Images/Fanart/Luci.png',          links: [{ type: 'carrd', url: 'https://lucielledream.carrd.co/' }, { type: 'twitch', url: 'https://www.twitch.tv/lucielledream' }] },
            { name: 'Taronari',         img: 'Images/Fanart/Taronari.png',       thumb: 'Images/Fanart/Taronari.png',       links: [{ type: 'carrd', url: 'https://taronari.carrd.co/' }, { type: 'twitch', url: 'https://www.twitch.tv/taronari' }] },
            { name: 'Tsukima_Kurage',   img: 'Images/Fanart/Tsukima Twerk.gif',  thumb: 'Images/Fanart/Tsukima 2.png',      links: [{ type: 'twitter', url: 'https://x.com/TsukimaVT' }, { type: 'twitch', url: 'https://www.twitch.tv/tsukima_kurage' }] },
            { name: 'EagleDL',          img: 'Images/Fanart/Duke.png',           thumb: 'Images/Fanart/Duke.png',           links: [{ type: 'instagram', url: 'https://www.instagram.com/eagledl' }, { type: 'twitch', url: 'https://www.twitch.tv/eaglelineartist' }] },
            { name: 'Yuskei_96',        img: 'Images/Fanart/YUSKEI.png',         thumb: 'Images/Fanart/YUSKEI.png',         links: [{ type: 'instagram', url: 'https://www.instagram.com/yuskei_fred/' }, { type: 'twitch', url: 'https://www.twitch.tv/yuskei_96' }] },
            { name: 'OottyDK',          img: 'Images/Fanart/Ootty.png',          thumb: 'Images/Fanart/Ootty.png',          links: [{ type: 'twitter', url: 'https://twitter.com/axelootty' }, { type: 'twitch', url: 'https://www.twitch.tv/oottydk' }] },
            { name: 'Braeburn',         img: 'Images/Fanart/Brae.jpeg',          thumb: 'Images/Fanart/Brae.jpeg',          links: [{ type: 'twitter', url: 'https://twitter.com/BraeburnTheBeef' }, { type: 'twitch', url: 'https://www.twitch.tv/braeburnthebeef' }] },
            { name: 'GibbsiTentecles',  img: 'Images/Fanart/Gibbsi.png',         thumb: 'Images/Fanart/Gibbsi.png',         links: [{ type: 'twitch', url: 'https://www.twitch.tv/gibbsitentecles' }] },
            { name: 'Airella_Nierling', img: 'Images/Fanart/Kumiko.jpg',         thumb: 'Images/Fanart/Kumiko.jpg',         links: [{ type: 'instagram', url: 'https://www.instagram.com/airella.nierling' }, { type: 'twitch', url: 'https://www.twitch.tv/airella_nierling' }] },
            { name: 'Shiki_artscreen',  img: 'Images/Fanart/Shikiartscreen.png', thumb: 'Images/Fanart/Shikiartscreen.png', links: [{ type: 'twitter', url: 'https://twitter.com/ShikiPlays' }, { type: 'twitch', url: 'https://www.twitch.tv/shiki_artscreen' }] },
            { name: 'Irah',             img: 'Images/Fanart/irah.png',           thumb: 'Images/Fanart/irah.png',           links: [{ type: 'instagram', url: 'https://www.instagram.com/ira_man27' }, { type: 'twitch', url: 'https://www.twitch.tv/irah_1' }] },
            { name: 'Reesethatpuffs',   img: 'Images/Fanart/Reesethatpuffs.png', thumb: 'Images/Fanart/Reesethatpuffs.png', links: [{ type: 'twitter', url: 'https://twitter.com/reesethatpuffs' }, { type: 'instagram', url: 'https://www.instagram.com/reesethatpuffs/' }, { type: 'twitch', url: 'https://www.twitch.tv/reesethatpuffs' }] },
            { name: 'Lazyscots',        img: 'Images/Fanart/Lazyscots.png',      thumb: 'Images/Fanart/Lazyscots.png',      links: [{ type: 'twitter', url: 'https://twitter.com/lazyscots' }, { type: 'twitch', url: 'https://www.twitch.tv/lazyscots' }] },
            { name: 'Toruhoshino',      img: 'Images/Fanart/Toruhoshino.jpg',    thumb: 'Images/Fanart/Toruhoshino.jpg',    links: [{ type: 'twitter', url: 'https://twitter.com/hoshino_toru' }, { type: 'twitch', url: 'https://www.twitch.tv/toruhoshino' }] },
            { name: 'Kaips',            img: 'Images/Fanart/Kaips.png',          thumb: 'Images/Fanart/Kaips.png',          links: [{ type: 'twitter', url: 'https://x.com/kaips_' }, { type: 'twitch', url: 'https://www.twitch.tv/kaips' }] },
            { name: 'CleonLH',          img: 'Images/Fanart/1000special.png',    thumb: 'Images/Fanart/1000special.png',    links: [{ type: 'twitch', url: 'https://www.twitch.tv/cleonlh' }] },
            { name: 'Uravgjoe',         img: 'Images/Fanart/feet.png',           thumb: 'Images/Fanart/feet.png',           links: [{ type: 'twitch', url: 'https://www.twitch.tv/uravgjoe' }] },
            { name: 'NumuOffline',      img: 'Images/Fanart/Numu.png',           thumb: 'Images/Fanart/Numu.png',           links: [{ type: 'twitch', url: 'https://www.twitch.tv/numuoffline' }] },
            { name: 'Makochivu',        img: 'Images/Fanart/Makochivu.png',      thumb: 'Images/Fanart/Makochivu.png',      links: [{ type: 'instagram', url: 'https://www.instagram.com/Makochivu' }, { type: 'twitch', url: 'https://www.twitch.tv/Makochivu' }] },
        ]
    },
    {
        label: 'BIRTHDAY',
        artists: [
            { name: 'Airella_Nierling',  img: 'Images/Fanart/Birthday/Airella.png',          thumb: 'Images/Fanart/Birthday/Airella.png',          links: [{ type: 'instagram', url: 'https://www.instagram.com/airella.nierling' }, { type: 'twitch', url: 'https://www.twitch.tv/airella_nierling' }] },
            { name: 'Bambs_Hajime',      img: 'Images/Fanart/Birthday/Bambs Thumbnail.png',  thumb: 'Images/Fanart/Birthday/Bambs Thumbnail.png',  links: [{ type: 'instagram', url: 'https://www.instagram.com/bambooart_/' }, { type: 'twitch', url: 'https://www.twitch.tv/bambs_hajime' }] },
            { name: 'Blob',              img: 'Images/Fanart/Birthday/Blobbu 1.png',         thumb: 'Images/Fanart/Birthday/Blobbu 1.png',         links: [] },
            { name: 'CrystalAura_606',   img: 'Images/Fanart/Birthday/Crystal.png',          thumb: 'Images/Fanart/Birthday/Crystal.png',          links: [{ type: 'twitter', url: 'https://x.com/error_606_exe' }, { type: 'twitch', url: 'https://www.twitch.tv/crystalaura_606' }] },
            { name: 'EagleDL',           img: 'Images/Fanart/Birthday/Duke.png',             thumb: 'Images/Fanart/Birthday/Duke.png',             links: [{ type: 'instagram', url: 'https://www.instagram.com/eagledl' }, { type: 'twitch', url: 'https://www.twitch.tv/eaglelineartist' }] },
            { name: 'Zeedodobird',       img: 'Images/Fanart/Birthday/furry_yap.jpg',        thumb: 'Images/Fanart/Birthday/furry_yap.jpg',        links: [{ type: 'instagram', url: 'https://www.instagram.com/dodothebirdy/' }, { type: 'twitch', url: 'https://www.twitch.tv/zeedodobird' }] },
            { name: 'GibbsiTentecles',   img: 'Images/Fanart/Birthday/Gibbsi.png',           thumb: 'Images/Fanart/Birthday/Gibbsi.png',           links: [{ type: 'twitch', url: 'https://www.twitch.tv/gibbsitentecles' }] },
            { name: 'Goobercheese33',    img: 'Images/Fanart/Birthday/Goober.png',           thumb: 'Images/Fanart/Birthday/Goober.png',           links: [{ type: 'twitch', url: 'https://www.twitch.tv/goobercheese33' }] },
            { name: 'Irah',              img: 'Images/Fanart/Birthday/Irah.png',             thumb: 'Images/Fanart/Birthday/Irah.png',             links: [{ type: 'instagram', url: 'https://www.instagram.com/ira_man27' }, { type: 'twitch', url: 'https://www.twitch.tv/irah_1' }] },
            { name: 'CaptJackHarlock',   img: 'Images/Fanart/Birthday/Jack.png',             thumb: 'Images/Fanart/Birthday/Jack.png',             links: [{ type: 'instagram', url: 'https://www.instagram.com/jackharlock_vinyl_corner/' }, { type: 'twitch', url: 'https://www.twitch.tv/captjackharlock' }] },
            { name: 'Reesethatpuffs',    img: 'Images/Fanart/Birthday/Reese.png',            thumb: 'Images/Fanart/Birthday/Reese.png',            links: [{ type: 'twitter', url: 'https://twitter.com/reesethatpuffs' }, { type: 'instagram', url: 'https://www.instagram.com/reesethatpuffs/' }, { type: 'twitch', url: 'https://www.twitch.tv/reesethatpuffs' }] },
            { name: 'Reqat',             img: 'Images/Fanart/Birthday/Reqat.png',            thumb: 'Images/Fanart/Birthday/Reqat.png',            links: [{ type: 'twitch', url: 'https://www.twitch.tv/reqat' }] },
            { name: 'Rhealinor',         img: 'Images/Fanart/Birthday/Rhea.png',             thumb: 'Images/Fanart/Birthday/Rhea.png',             links: [{ type: 'instagram', url: 'https://www.instagram.com/rhealinor/' }] },
            { name: 'Lazyscots',         img: 'Images/Fanart/Birthday/Scot.jpg',             thumb: 'Images/Fanart/Birthday/Scot.jpg',             links: [{ type: 'twitter', url: 'https://twitter.com/lazyscots' }, { type: 'twitch', url: 'https://www.twitch.tv/lazyscots' }] },
            { name: 'Shiki_artscreen',   img: 'Images/Fanart/Birthday/Shiki.png',            thumb: 'Images/Fanart/Birthday/Shiki.png',            links: [{ type: 'twitter', url: 'https://twitter.com/ShikiPlays' }, { type: 'twitch', url: 'https://www.twitch.tv/shiki_artscreen' }] },
            { name: 'Stargamer',         img: 'Images/Fanart/Birthday/Stargamer.png',        thumb: 'Images/Fanart/Birthday/Stargamer.png',        links: [{ type: 'youtube', url: 'https://www.youtube.com/@stargamersucksatgaming' }, { type: 'twitch', url: 'https://www.twitch.tv/stargamersucksatgaming' }] },
            { name: 'Tempura & Friends', img: 'Images/Fanart/Birthday/Tempura.gif',          thumb: 'Images/Fanart/Birthday/1.png',                links: [{ type: 'carrd', url: 'https://thetempurafox.carrd.co/' }, { type: 'twitch', url: 'https://www.twitch.tv/thetempurafox' }] },
            { name: 'Valkythemeow',      img: 'Images/Fanart/Birthday/Valky.png',            thumb: 'Images/Fanart/Birthday/Valky.png',            links: [{ type: 'instagram', url: 'https://www.instagram.com/valkythemeow/' }, { type: 'twitch', url: 'https://www.twitch.tv/valkythemeow' }] },
            { name: 'Yuskei_96',         img: 'Images/Fanart/Birthday/Yuskei.png',           thumb: 'Images/Fanart/Birthday/Yuskei.png',           links: [{ type: 'instagram', url: 'https://www.instagram.com/yuskei_fred/' }, { type: 'twitch', url: 'https://www.twitch.tv/yuskei_96' }] },
        ]
    },
    {
        label: 'MAID',
        artists: [
            { name: 'Tsukima_Kurage', img: 'Images/Fanart/Maid/Tsukima.png',  thumb: 'Images/Fanart/Maid/Tsukima.png',  links: [{ type: 'twitter', url: 'https://x.com/TsukimaVT' }, { type: 'twitch', url: 'https://www.twitch.tv/tsukima_kurage' }] },
            { name: 'Reqat',          img: 'Images/Fanart/Maid/Reqat.png',    thumb: 'Images/Fanart/Maid/Reqat.png',    links: [{ type: 'twitch', url: 'https://www.twitch.tv/reqat' }] },
            { name: 'A_Burn_Buck',    img: 'Images/Fanart/Maid/Buck_Maid.png',thumb: 'Images/Fanart/Maid/Buck_Maid.png',links: [{ type: 'instagram', url: 'https://www.instagram.com/_fuelborn_' }, { type: 'twitch', url: 'https://www.twitch.tv/a_burnt_buck' }] },
            { name: 'lemonb_',        img: 'Images/Fanart/Maid/LemonBee.png', thumb: 'Images/Fanart/Maid/LemonBee.png', links: [{ type: 'instagram', url: 'https://www.instagram.com/itzlemonbee_/_' }, { type: 'twitch', url: 'https://www.twitch.tv/lemonb_' }] },
            { name: 'Taronari',       img: 'Images/Fanart/Maid/Taro.jpg',     thumb: 'Images/Fanart/Maid/Taro.jpg',     links: [{ type: 'carrd', url: 'https://taronari.carrd.co/' }, { type: 'twitch', url: 'https://www.twitch.tv/taronari' }] },
        ]
    },
    {
        label: 'FURRY',
        artists: [
            { name: 'Yotemotes',       img: 'Images/Fanart/Furry/image.png',                             thumb: 'Images/Fanart/Furry/image.png',                             links: [{ type: 'bluesky', url: 'https://bsky.app/profile/joonytv.gremgang.com' }, { type: 'twitch', url: 'https://www.twitch.tv/yotemotes' }] },
            { name: 'Reesethatpuffs',  img: 'Images/Fanart/Furry/V_Gen.png',                            thumb: 'Images/Fanart/Furry/V_Gen.png',                             links: [{ type: 'twitter', url: 'https://twitter.com/reesethatpuffs' }, { type: 'instagram', url: 'https://www.instagram.com/reesethatpuffs/' }, { type: 'twitch', url: 'https://www.twitch.tv/reesethatpuffs' }] },
            { name: 'A_Burn_Buck',     img: 'Images/Fanart/Misc/Burnthatbuck- Furry Yap[White].png',    thumb: 'Images/Fanart/Misc/Burnthatbuck- Furry Yap[White].png',    links: [{ type: 'instagram', url: 'https://www.instagram.com/_fuelborn_' }, { type: 'twitch', url: 'https://www.twitch.tv/a_burnt_buck' }] },
            { name: 'A_Burn_Buck',     img: 'Images/Fanart/Furry/Buck2.png',                            thumb: 'Images/Fanart/Furry/Buck2.png',                            links: [{ type: 'instagram', url: 'https://www.instagram.com/_fuelborn_' }, { type: 'twitch', url: 'https://www.twitch.tv/a_burnt_buck' }] },
            { name: 'Kayokadavar',     img: 'Images/Fanart/Furry/yap_n_mako.jpg',                       thumb: 'Images/Fanart/Furry/yap_n_mako.jpg',                       links: [{ type: 'twitch', url: 'https://www.twitch.tv/kayokadavar' }] },
            { name: 'Makochivu',       img: 'Images/Fanart/Furry/Makochivu.png',                        thumb: 'Images/Fanart/Furry/Makochivu.png',                        links: [{ type: 'instagram', url: 'https://www.instagram.com/Makochivu' }, { type: 'twitch', url: 'https://www.twitch.tv/Makochivu' }] },
            { name: 'Shiki_artscreen', img: 'Images/Fanart/Furry/Shiki Hampter.jpg',                    thumb: 'Images/Fanart/Furry/Shiki Hampter.jpg',                    links: [{ type: 'twitter', url: 'https://twitter.com/ShikiPlays' }, { type: 'twitch', url: 'https://www.twitch.tv/shiki_artscreen' }] },
            { name: 'GibbsiTentecles', img: 'Images/Fanart/Furry/OctipusYap.png',                      thumb: 'Images/Fanart/Furry/OctipusYap.png',                      links: [{ type: 'twitch', url: 'https://www.twitch.tv/gibbsitentecles' }] },
            { name: 'Lazyscots',       img: 'Images/Fanart/Furry/Ninesols.png',                         thumb: 'Images/Fanart/Furry/Ninesols.png',                         links: [{ type: 'twitch', url: 'https://www.twitch.tv/lazyscots' }] },
            { name: 'Zeedodobird',     img: 'Images/Fanart/Birthday/furry_yap.jpg',                     thumb: 'Images/Fanart/Birthday/furry_yap.jpg',                     links: [{ type: 'instagram', url: 'https://www.instagram.com/dodothebirdy/' }, { type: 'twitch', url: 'https://www.twitch.tv/zeedodobird' }] },
            { name: 'Valkythemeow',    img: 'Images/Fanart/Birthday/Valky.png',                         thumb: 'Images/Fanart/Birthday/Valky.png',                         links: [{ type: 'instagram', url: 'https://www.instagram.com/valkythemeow/' }, { type: 'twitch', url: 'https://www.twitch.tv/valkythemeow' }] },
            { name: 'Tsukima_Kurage',  img: 'Images/Fanart/Furry/Tsukima_Cat.png',                     thumb: 'Images/Fanart/Furry/Tsukima_Cat.png',                     links: [{ type: 'twitter', url: 'https://x.com/TsukimaVT' }, { type: 'twitch', url: 'https://www.twitch.tv/tsukima_kurage' }] },
        ]
    },
    {
        label: 'MISC',
        artists: [
            { name: 'Airella_Nierling',  img: 'Images/Fanart/Misc/A.png',                                                      thumb: 'Images/Fanart/Misc/A.png',                                                      links: [{ type: 'instagram', url: 'https://www.instagram.com/airella.nierling' }, { type: 'twitch', url: 'https://www.twitch.tv/airella_nierling' }] },
            { name: 'Lazyscots',         img: 'Images/Fanart/Misc/faith_tut_yap.png',                                          thumb: 'Images/Fanart/Misc/faith_tut_yap.png',                                          links: [{ type: 'twitter', url: 'https://twitter.com/lazyscots' }, { type: 'twitch', url: 'https://www.twitch.tv/lazyscots' }] },
            { name: 'Silly_1vy',         img: 'Images/Fanart/Misc/OEMGEE_IT_MAX_AND_YAP.png',                                 thumb: 'Images/Fanart/Misc/OEMGEE_IT_MAX_AND_YAP.png',                                 links: [{ type: 'instagram', url: 'https://www.instagram.com/ira_man27' }, { type: 'twitch', url: 'https://www.twitch.tv/Silly_1vy' }] },
            { name: 'Irah',              img: 'Images/Fanart/Misc/SPOILER_pov__you_and_your_friends_are_playing_conect_4.png', thumb: 'Images/Fanart/Misc/SPOILER_pov__you_and_your_friends_are_playing_conect_4.png', links: [{ type: 'instagram', url: 'https://www.instagram.com/ira_man27' }, { type: 'twitch', url: 'https://www.twitch.tv/irah_1' }] },
            { name: 'Irah',              img: 'Images/Fanart/Misc/irah.png',                                                   thumb: 'Images/Fanart/Misc/irah.png',                                                   links: [{ type: 'instagram', url: 'https://www.instagram.com/ira_man27' }, { type: 'twitch', url: 'https://www.twitch.tv/irah_1' }] },
            { name: 'Yuskei_96',         img: 'Images/Fanart/Misc/Yuskei (2).png',                                            thumb: 'Images/Fanart/Misc/Yuskei (2).png',                                            links: [{ type: 'instagram', url: 'https://www.instagram.com/yuskei_fred/' }, { type: 'twitch', url: 'https://www.twitch.tv/yuskei_96' }] },
            { name: 'Shiki_artscreen',   img: 'Images/Fanart/Misc/Brae.jpg',                                                   thumb: 'Images/Fanart/Misc/Brae.jpg',                                                   links: [{ type: 'twitter', url: 'https://twitter.com/ShikiPlays' }, { type: 'twitch', url: 'https://www.twitch.tv/shiki_artscreen' }] },
            { name: 'Shiki_artscreen',   img: 'Images/Fanart/Misc/Shikiartscreen.jpeg',                                        thumb: 'Images/Fanart/Misc/Shikiartscreen.jpeg',                                        links: [{ type: 'twitter', url: 'https://twitter.com/ShikiPlays' }, { type: 'twitch', url: 'https://www.twitch.tv/shiki_artscreen' }] },
            { name: 'Shiki_artscreen',   img: 'Images/Fanart/Misc/Proposal.gif',                                               thumb: 'Images/Fanart/Misc/P.png',                                                      links: [{ type: 'twitter', url: 'https://twitter.com/ShikiPlays' }, { type: 'twitch', url: 'https://www.twitch.tv/shiki_artscreen' }] },
            { name: 'Shiki_artscreen',   img: 'Images/Fanart/Misc/Timeout.png',                                                thumb: 'Images/Fanart/Misc/Timeout.png',                                                links: [{ type: 'twitter', url: 'https://twitter.com/ShikiPlays' }, { type: 'twitch', url: 'https://www.twitch.tv/shiki_artscreen' }] },
            { name: 'Tsukima_Kurage',    img: 'Images/Fanart/Misc/Tsukima.png',                                                thumb: 'Images/Fanart/Misc/Tsukima.png',                                                links: [{ type: 'twitter', url: 'https://x.com/TsukimaVT' }, { type: 'twitch', url: 'https://www.twitch.tv/tsukima_kurage' }] },
            { name: 'Reesethatpuffs',    img: 'Images/Fanart/Misc/Emoyap.png',                                                 thumb: 'Images/Fanart/Misc/Emoyap.png',                                                 links: [{ type: 'twitter', url: 'https://twitter.com/reesethatpuffs' }, { type: 'instagram', url: 'https://www.instagram.com/reesethatpuffs/' }, { type: 'twitch', url: 'https://www.twitch.tv/reesethatpuffs' }] },
            { name: 'Reesethatpuffs',    img: 'Images/Fanart/Misc/ReesethatPuff- Yappie.png',                                  thumb: 'Images/Fanart/Misc/ReesethatPuff- Yappie.png',                                  links: [{ type: 'twitter', url: 'https://twitter.com/reesethatpuffs' }, { type: 'instagram', url: 'https://www.instagram.com/reesethatpuffs/' }, { type: 'twitch', url: 'https://www.twitch.tv/reesethatpuffs' }] },
            { name: 'Akiellafw',         img: 'Images/Fanart/Misc/CyAkiella_.png',                                             thumb: 'Images/Fanart/Misc/CyAkiella_.png',                                             links: [{ type: 'twitch', url: 'https://www.twitch.tv/akiellafw' }] },
            { name: 'VoyagerLof',        img: 'Images/Fanart/Misc/Adventorpadoru.png',                                         thumb: 'Images/Fanart/Misc/Adventorpadoru.png',                                         links: [{ type: 'youtube', url: 'https://www.youtube.com/@VoyagerLOAF' }, { type: 'twitch', url: 'https://www.twitch.tv/voyagerloaf' }] },
            { name: 'Smakesinmygarden',  img: 'Images/Fanart/Misc/Carrinwithaknife.jpg',                                       thumb: 'Images/Fanart/Misc/Carrinwithaknife.jpg',                                       links: [{ type: 'twitch', url: 'https://www.twitch.tv/Smakesinmygarden' }] },
        ]
    },
];

// ── YAPPERS GENERATIONS ───────────────────────────────────────────────────────
// talk = animated GIF shown in the main carousel
// mute = static/calmer image used as the thumbnail
const YAPPERS_GENS = [
    {
        label: 'GEN ∅',
        yappers: [
            { name: 'Braeburnthebeef', talk: 'Images/Yappers/Brae talk.gif',   mute: 'Images/Yappers/Brae talk.gif' },
        ]
    },
    {
        label: 'GEN 1',
        yappers: [
            { name: 'Yapcreations',   talk: 'Images/Yappers/yaptalk.gif',    mute: 'Images/Yappers/yaptalk.gif' },
            { name: 'Nyx_Moonveil',   talk: 'Images/Yappers/Jay talk.gif',   mute: 'Images/Yappers/Jay talk.gif' },
            { name: 'Jejj_LimeJuice', talk: 'Images/Yappers/jejjtalk.gif',   mute: 'Images/Yappers/jejjtalk.gif' },
            { name: 'Lazyscots',      talk: 'Images/Yappers/scottalk.gif',   mute: 'Images/Yappers/scottalk.gif' },
            { name: 'Toru_Hoshino',   talk: 'Images/Yappers/torutalk.gif',   mute: 'Images/Yappers/torutalk.gif' },
            { name: 'Walterken910',   talk: 'Images/Yappers/walttalk.gif',   mute: 'Images/Yappers/walttalk.gif' },
            { name: 'Strm_64',        talk: 'Images/Yappers/Strmtalk.gif',   mute: 'Images/Yappers/Strmtalk.gif' },
            { name: 'Drawernub',      talk: 'Images/Yappers/nubtalk.gif',    mute: 'Images/Yappers/nubtalk.gif' },
        ]
    },
    {
        label: 'GEN 2',
        yappers: [
            { name: 'Makochivu',       talk: 'Images/Yappers/Makocidle.gif',    mute: 'Images/Yappers/Makocidle.gif' },
            { name: 'Shiki_ArtScreen', talk: 'Images/Yappers/Shikitalk.gif',    mute: 'Images/Yappers/Shikitalk.gif' },
            { name: 'Spactana',        talk: 'Images/Yappers/Spactanatalk.gif', mute: 'Images/Yappers/Spactanatalk.gif' },
            { name: 'Momichu',         talk: 'Images/Yappers/Momitalk.gif',     mute: 'Images/Yappers/Momitalk.gif' },
            { name: 'A_Burn_Buck',     talk: 'Images/Yappers/Bucktalk.gif',     mute: 'Images/Yappers/Bucktalk.gif' },
            { name: 'Rainintheforest', talk: 'Images/Yappers/Raintalk.gif',     mute: 'Images/Yappers/Raintalk.gif' },
        ]
    },
    {
        label: 'GEN 2.5',
        yappers: [
            { name: 'Goobercheese33', talk: 'Images/Yappers/goobetalk.gif',  mute: 'Images/Yappers/goobetalk.gif' },
            { name: 'Dolf',           talk: 'Images/Yappers/talkdolf.gif',   mute: 'Images/Yappers/talkdolf.gif' },
            { name: 'Rhealinor',      talk: 'Images/Yappers/rheatalk.gif',   mute: 'Images/Yappers/rheatalk.gif' },
            { name: 'Reesethatpuffs', talk: 'Images/Yappers/Reesetalk.gif',  mute: 'Images/Yappers/Reesetalk.gif' },
            { name: 'Kaips',          talk: 'Images/Yappers/kaipstalk.gif',  mute: 'Images/Yappers/kaipstalk.gif' },
        ]
    },
    {
        label: 'GEN 3',
        yappers: [
            { name: 'CrystalAura_606', talk: 'Images/Yappers/crystaltalk.gif',   mute: 'Images/Yappers/crystaltalk.gif' },
            { name: 'Zeedodobird',     talk: 'Images/Yappers/dodotalk.gif',      mute: 'Images/Yappers/dodotalk.gif' },
            { name: 'Goobercheese33',  talk: 'Images/Yappers/newgoobertalk.gif', mute: 'Images/Yappers/Goobermute.png' },
            { name: 'Drream',          talk: 'Images/Yappers/reamtalk.gif',      mute: 'Images/Yappers/reamtalk.gif' },
            { name: 'ReesethatPuff',   talk: 'Images/Yappers/newreesetalk.gif',  mute: 'Images/Yappers/newreesetalk.gif' },
        ]
    },
    {
        label: 'GEN 4',
        yappers: [
            { name: 'GibbsiTentecles', talk: 'Images/Yappers/Gibbsitalk.gif',  mute: 'Images/Yappers/Gibbsitalk.gif' },
            { name: 'Silly_1vy',       talk: 'Images/Yappers/irahtalk.gif',    mute: 'Images/Yappers/irahtalk.gif' },
            { name: 'Kentra_Kaze',     talk: 'Images/Yappers/kentratalk.gif',  mute: 'Images/Yappers/kentratalk.gif' },
            { name: 'Neranx0',         talk: 'Images/Yappers/FrxnxVtalk.gif', mute: 'Images/Yappers/FrxnxVtalk.gif' },
        ]
    },
    {
        label: 'GEN 5',
        yappers: [
            { name: 'Koyuurei',         talk: 'Images/Yappers/Koy Talk.gif',     mute: 'Images/Yappers/Koy Talk.gif' },
            { name: 'Tsukima_Kurage',   talk: 'Images/Yappers/Tsukima Talk.gif', mute: 'Images/Yappers/Tsukima Talk.gif' },
            { name: 'Tempura_Fox',      talk: 'Images/Yappers/Tempuratalk.gif',  mute: 'Images/Yappers/Tempuratalk.gif' },
            { name: 'Airella_Nierling', talk: 'Images/Yappers/airellatalk.gif',  mute: 'Images/Yappers/airellatalk.gif' },
            { name: 'Reqat',            talk: 'Images/Yappers/reqattalk.gif',    mute: 'Images/Yappers/reqattalk.gif' },
        ]
    },
    {
        label: 'GEN 6',
        yappers: [
            { name: 'Lil_Devy',          talk: 'Images/Yappers/lildevytalk.gif',  mute: 'Images/Yappers/lildevytalk.gif' },
            { name: 'Theonerhythm_899',  talk: 'Images/Yappers/rhythmtalk.gif',   mute: 'Images/Yappers/rhythmmutedtalk.gif' },
            { name: 'Akiellafw',         talk: 'Images/Yappers/Akiellatalk.gif',  mute: 'Images/Yappers/Akiellatalk.gif' },
            { name: 'Yuskei',            talk: 'Images/Yappers/yuskeitalk.gif',   mute: 'Images/Yappers/yuskeitalk.gif' },
        ]
    },
    {
        label: 'GEN 7',
        yappers: [
            { name: 'CarpridaeTheGoat', talk: 'Images/Yappers/capritalk.gif',   mute: 'Images/Yappers/Caprimute.png' },
            { name: 'Bambs_Hajime',     talk: 'Images/Yappers/bambstalk.gif',   mute: 'Images/Yappers/bambmute.gif' },
            { name: 'Jack_Harlock',     talk: 'Images/Yappers/jacktalk.gif',    mute: 'Images/Yappers/jackmuted.png' },
            { name: 'Phoenix_Rants',    talk: 'Images/Yappers/phoenixtalk.gif', mute: 'Images/Yappers/phoenixsleep.gif' },
        ]
    },
    {
        label: 'GEN 8',
        yappers: [
            { name: 'Maxforgevt',      talk: 'Images/Yappers/Maxtalk.gif',   mute: 'Images/Yappers/Maxmute.png' },
            { name: 'Eaglelineartist', talk: 'Images/Yappers/eagletalk.gif', mute: 'Images/Yappers/eaglemuted.gif' },
            { name: '???',             talk: 'Images/Yappers/harutalk.gif',  mute: 'Images/Yappers/harumute.gif' },
            { name: 'SaayaTheFox',     talk: 'Images/Yappers/sayatalk.gif',  mute: 'Images/Yappers/sayamuted.gif' },
        ]
    },
    {
        label: 'GEN 9',
        yappers: [
            { name: 'Cheejyg',   talk: 'Images/Yappers/cheetalk.gif',  mute: 'Images/Yappers/cheemuted.gif' },
            { name: 'Venny',     talk: 'Images/Yappers/vennytalk.gif', mute: 'Images/Yappers/vennnymuted.gif' },
            { name: 'Syathenya', talk: 'Images/Yappers/syatalk.gif',   mute: 'Images/Yappers/syamuted.png' },
        ]
    },
    {
        label: 'GEN 10',
        yappers: [
            { name: 'Sleepiistired', talk: 'Images/Yappers/sleepitalk.gif', mute: 'Images/Yappers/Sleepimuted.png' },
            { name: 'Lil_Ashi',     talk: 'Images/Yappers/ashitalk.gif',   mute: 'Images/Yappers/Ashimuted.png' },
            { name: 'Amphibitrix',  talk: 'Images/Yappers/amphitalk.gif',  mute: 'Images/Yappers/amphimuted.gif' },
            { name: 'Xeltheries',   talk: 'Images/Yappers/xeltalk.gif',    mute: 'Images/Yappers/Xelmuted.png' },
        ]
    },
    {
        label: 'GEN 11',
        yappers: [
            { name: 'MissLevochki', talk: 'Images/Yappers/Misslevochkitalk.gif', mute: 'Images/Yappers/MisslevochkiMuted.png' },
            { name: 'A_Burn_Buck',  talk: 'Images/Yappers/BurntBucktalk.gif',   mute: 'Images/Yappers/BurntBuckmuted.gif' },
            { name: 'VoyagerLof',   talk: 'Images/Yappers/loftalk.gif',         mute: 'Images/Yappers/lofmuted.gif' },
            { name: 'Leianyx',      talk: 'Images/Yappers/leianyxtalk.gif',     mute: 'Images/Yappers/Leianyx Muted.png' },
            { name: 'Botan',        talk: 'Images/Yappers/botantalk.gif',       mute: 'Images/Yappers/BotanMuted.png' },
        ]
    },
    {
        label: 'GEN 12',
        yappers: [
            { name: '???',        talk: 'Images/Yappers/archtalk.gif',    mute: 'Images/Yappers/archmute.gif' },
            { name: 'Bouncy2D',   talk: 'Images/Yappers/BouncyTalk.gif',  mute: 'Images/Yappers/Bouncymuted.gif' },
            { name: 'Harvlark',   talk: 'Images/Yappers/havlarktalk.gif', mute: 'Images/Yappers/Havlarkmuted000.png' },
            { name: 'Patch_does', talk: 'Images/Yappers/PatchTalk.gif',   mute: 'Images/Yappers/Patchmute.gif' },
            { name: 'Acid_n_ade', talk: 'Images/Yappers/Acidtalk.gif',    mute: 'Images/Yappers/Acidtalk.gif' },
        ]
    },
    {
        label: 'GEN 13',
        yappers: [
            { name: 'Valkythemeow', talk: 'Images/Yappers/valkytalk.gif',  mute: 'Images/Yappers/valkytalk.gif' },
            { name: 'Yamaxyl',     talk: 'Images/Yappers/yamatalk.gif',    mute: 'Images/Yappers/yamatalk.gif' },
            { name: 'Kidthekhai',  talk: 'Images/Yappers/khaitalk.gif',    mute: 'Images/Yappers/khaitalk.gif' },
            { name: 'NinaSakura',  talk: 'Images/Yappers/ninatalk.gif',    mute: 'Images/Yappers/ninatalk.gif' },
            { name: 'Akawaquack',  talk: 'Images/Yappers/akawatalk.gif',   mute: 'Images/Yappers/akawatalk.gif' },
        ]
    },
    {
        label: 'SPECIAL',
        yappers: [
            { name: 'AerooctoInkstics',  talk: 'Images/Yappers/AerooctoTalk.gif', mute: 'Images/Yappers/Aerooctomuted.gif' },
            { name: 'KuronekoKazuyaCh',  talk: 'Images/Yappers/KazuyaTalk.gif',   mute: 'Images/Yappers/KazuyaMute.gif' },
            { name: 'R.P',               talk: 'Images/Yappers/talkrachel.gif',   mute: 'Images/Yappers/muteRachel.png' },
        ]
    },
];

// ── ILLUSTRATION CAROUSEL (index.html) ───────────────────────────────────────
// Add or remove entries freely — the carousel adjusts automatically.
const illustrationImages = [
    { src: 'Images/Portfolio/Ruka.png',    alt: 'Ruka Sarashina' },
    { src: 'Images/Portfolio/Pumpkin.png', alt: 'Pumpkin Pie Cookie' },
    { src: 'Images/Portfolio/Yap.png',     alt: 'Yap' },
];

// ── COMIC SERIES (comics.html) ────────────────────────────────────────────────
// Each series: { name, comics: [{ title, src }, ...] }
// Last entry in each comics array = shown by default (most recent page).
const COMIC_SERIES = [
    { name: "Don't Open Me", comics: [
        //{ title: 'Page 1', src: 'Images/Portfolio/Ruka.png' },
    ]},
    { name: 'Personal', comics: [
        //{ title: 'Page 1', src: 'Images/Portfolio/Chibi.png' },
    ]}
];

// ── CHARACTER SERIES (characters.html) ───────────────────────────────────────
// art:   full-body PNG (transparent bg preferred)
// thumb: portrait crop for the carousel
// bg:    wide scene image (will be blurred + panned behind the character)
const SERIES = [
    {
        name: 'Series One',
        characters: [
            {
                name: 'Character A', age: '??',
                accent: '#FFC603',
                comic: 'comics.html',
                desc: 'A brief description of this character. Who are they? What drives them? What role do they play in the story?',
                likes: 'Coffee, rainy days, old books', dislikes: 'Loud noises, dishonesty',
                tags: ['Mysterious', 'Introspective', 'Resilient'],
                quote: 'Every step forward is a step worth taking.',
                art:   'Images/Commission/cyidle.gif',
                thumb: 'Images/Commission/cyidle.gif',
                bg:    'Images'
            },
            {
                name: 'Character B', age: '24',
                accent: '#FF6B6B',
                comic: 'comics.html',
                desc: 'Another character in this series. Add their backstory, personality, and defining traits here.',
                likes: 'Sparring, open skies, music', dislikes: 'Sitting still, overcooked food',
                tags: ['Hot-Headed', 'Loyal', 'Courageous'],
                quote: 'Strength isn\'t just muscle — it\'s resolve.',
                art:   'Images/Characters/Series1/charB.png',
                thumb: 'Images/Characters/Series1/charB-thumb.png',
                bg:    'Images/Characters/Series1/charB-bg.jpg'
            },
            {
                name: 'Character C', age: '19',
                accent: '#7EC8E3',
                desc: 'Third character of the series. Describe their unique role, personality quirks, and relationships.',
                likes: 'Stargazing, tea ceremonies, precision', dislikes: 'Chaos, being underestimated',
                tags: ['Calm', 'Calculating', 'Disciplined'],
                quote: 'Patience is the sharpest weapon.',
                art:   'Images/Characters/Series1/charC.png',
                thumb: 'Images/Characters/Series1/charC-thumb.png',
                bg:    'Images/Characters/Series1/charC-bg.jpg'
            }
        ]
    },
    /* HIDDEN — uncomment to restore
    {
        name: 'Series Two',
        characters: [
            {
                name: 'Character D', age: '30',
                accent: '#A8E6CF',
                desc: 'First character of Series Two. Use this space to introduce them and their world.',
                likes: 'Architecture, dusk, strategy games', dislikes: 'Recklessness, broken promises',
                tags: ['Strategic', 'Stoic', 'Ambitious'],
                quote: 'A fortress begins with a single stone.',
                art:   'Images/Characters/Series2/charD.png',
                thumb: 'Images/Characters/Series2/charD-thumb.png',
                bg:    'Images/Characters/Series2/charD-bg.jpg'
            },
            {
                name: 'Character E', age: '17',
                accent: '#FFB347',
                desc: 'Second character of Series Two. Describe their arc, motivations, and personality here.',
                likes: 'Speed, street food, neon lights', dislikes: 'Rules, waiting in line',
                tags: ['Reckless', 'Energetic', 'Free-Spirited'],
                quote: 'Rules are just suggestions for the slow.',
                art:   'Images/Characters/Series2/charE.png',
                thumb: 'Images/Characters/Series2/charE-thumb.png',
                bg:    'Images/Characters/Series2/charE-bg.jpg'
            }
        ]
    },
    {
        name: 'Series Three',
        characters: [
            {
                name: 'Character F', age: 'Unknown',
                accent: '#C9B1FF',
                desc: 'First character of Series Three. Paint a picture of who they are in a few sentences.',
                likes: 'Silence, deep forests, puzzles', dislikes: 'Crowds, bright lights, small talk',
                tags: ['Enigmatic', 'Solitary', 'Perceptive'],
                quote: 'The unseen hand moves the world.',
                art:   'Images/Characters/Series3/charF.png',
                thumb: 'Images/Characters/Series3/charF-thumb.png',
                bg:    'Images/Characters/Series3/charF-bg.jpg'
            },
            {
                name: 'Character G', age: '28',
                accent: '#FF8FAB',
                desc: 'Second character of Series Three. Describe their role in the narrative and what makes them memorable.',
                likes: 'Competition, loyal friends, storms', dislikes: 'Betrayal, cowardice, indecision',
                tags: ['Fierce', 'Passionate', 'Unyielding'],
                quote: 'The storm doesn\'t apologise for the rain.',
                art:   'Images/Characters/Series3/charG.png',
                thumb: 'Images/Characters/Series3/charG-thumb.png',
                bg:    'Images/Characters/Series3/charG-bg.jpg'
            }
        ]
    },
    {
        name: 'Series Four',
        characters: [
            {
                name: 'Character H', age: '22',
                accent: '#90EE90',
                desc: 'First character of Series Four. Introduce them, their world, and the conflict they face.',
                likes: 'Cooking, travel, old maps', dislikes: 'Injustice, predictability',
                tags: ['Curious', 'Warm-Hearted', 'Adventurous'],
                quote: 'Every horizon hides a new adventure.',
                art:   'Images/Characters/Series4/charH.png',
                thumb: 'Images/Characters/Series4/charH-thumb.png',
                bg:    'Images/Characters/Series4/charH-bg.jpg'
            },
            {
                name: 'Character I', age: '35',
                accent: '#B0C4DE',
                desc: 'Second character of Series Four. Veteran, mentor, or rival — describe what they bring to the story.',
                likes: 'Discipline, teaching, strong coffee', dislikes: 'Excuses, wasted potential',
                tags: ['Stern', 'Wise', 'Principled'],
                quote: 'A student surpassing their master is the greatest reward.',
                art:   'Images/Characters/Series4/charI.png',
                thumb: 'Images/Characters/Series4/charI-thumb.png',
                bg:    'Images/Characters/Series4/charI-bg.jpg'
            }
        ]
    },
    END HIDDEN */
];
