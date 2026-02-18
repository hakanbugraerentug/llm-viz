import React from 'react';
import { Phase } from "./Walkthrough";
import { commentary, embed, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";
import s from './Walkthrough.module.scss';
import { Vec3 } from '@/src/utils/vector';

let minGptLink = 'https://github.com/karpathy/minGPT';
let pytorchLink = 'https://pytorch.org/';
let andrejLink = 'https://karpathy.ai/';
let zeroToHeroLink = 'https://karpathy.ai/zero-to-hero.html';

export function walkthrough01_Prelim(args: IWalkthroughArgs) {
    let { state, walkthrough: wt } = args;

    if (wt.phase !== Phase.Intro_Prelim) {
        return;
    }

    setInitialCamera(state, new Vec3(184.744, 0.000, -636.820), new Vec3(296.000, 16.000, 13.500));

    let c0 = commentary(wt, null, 0)`
Algoritmanın ayrıntılarına dalmadan önce, kısaca bir adım geriye gidelim.

Bu kılavuz _inference_ (çıkarım) üzerine odaklanmaktadır, training (eğitim) üzerine değil ve bu nedenle tüm makine öğrenimi sürecinin sadece küçük bir parçasıdır.
Bizim durumumuzda, modelin weight'leri önceden eğitilmiştir ve çıktı üretmek için inference sürecini kullanırız. Bu doğrudan tarayıcınızda çalışır.

Burada sergilenen model, "bağlam tabanlı token tahmin edicisi" olarak tanımlanabilen GPT (generative pre-trained transformer) ailesinin bir parçasıdır.
OpenAI bu aileyi 2018'de tanıttı ve GPT-2, GPT-3 ve yaygın olarak kullanılan ChatGPT'nin temeli olan GPT-3.5 Turbo gibi önemli üyeler var.
GPT-4 ile de ilişkili olabilir, ancak spesifik detaylar bilinmiyor.

Bu kılavuz, ${embedLink('minGPT', minGptLink)} GitHub projesi, ${embedLink('PyTorch', pytorchLink)}'ta minimal bir GPT uygulaması
ve ${embedLink('Andrej Karpathy', andrejLink)} tarafından oluşturulmuş olmasından ilham aldı.
YouTube serisi ${embedLink("Neural Networks: Zero to Hero", zeroToHeroLink)} ve minGPT projesi bu kılavuzun
oluşturulmasında paha biçilmez kaynaklar olmuştur. Burada gösterilen oyuncak model, minGPT projesi içinde bulunan bir modele dayanmaktadır.

Pekala, hadi başlayalım!
`;

}

export function embedLink(a: React.ReactNode, href: string) {
    return embedInline(<a className={s.externalLink} href={href} target="_blank" rel="noopener noreferrer">{a}</a>);
}

export function embedInline(a: React.ReactNode) {
    return { insertInline: a };
}


// Another similar model is BERT (bidirectional encoder representations from transformers), a "context-aware text encoder" commonly
// used for tasks like document classification and search.  Newer models like Facebook's LLaMA (large language model architecture), continue to use
// a similar transformer architecture, albeit with some minor differences.
