import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async stylistSearch(prompt: string) {
    const lower = prompt.toLowerCase();

    // Natural language parsing rule engine (or external AI fallback)
    const allProducts = await this.prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        images: true,
      },
    });

    // Score products based on keyword intersection
    const scored = allProducts.map((p) => {
      let score = 0;
      if (lower.includes('maroon') && (p.title.toLowerCase().includes('maroon') || p.tags?.toLowerCase().includes('maroon'))) score += 10;
      if (lower.includes('gold') && (p.title.toLowerCase().includes('gold') || p.tags?.toLowerCase().includes('gold'))) score += 10;
      if (lower.includes('silk') && p.fabric.toLowerCase().includes('silk')) score += 10;
      if (lower.includes('cotton') && p.fabric.toLowerCase().includes('cotton')) score += 10;
      if (lower.includes('anarkali') && p.title.toLowerCase().includes('anarkali')) score += 15;
      if (lower.includes('suit') && p.title.toLowerCase().includes('suit')) score += 8;
      if (lower.includes('bedsheet') && p.title.toLowerCase().includes('bedsheet')) score += 15;
      if (lower.includes('king') && p.title.toLowerCase().includes('king')) score += 10;
      if (lower.includes('wedding') || lower.includes('reception') || lower.includes('party')) {
        if (p.title.toLowerCase().includes('zari') || p.fabric.toLowerCase().includes('silk') || p.isBestSeller) score += 12;
      }
      if (lower.includes('office') || lower.includes('daily') || lower.includes('summer')) {
        if (p.fabric.toLowerCase().includes('cotton')) score += 12;
      }

      // Check budget
      const budgetMatch = lower.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || lower.match(/(?:₹|rs\.?|inr)\s*(\d+)/i);
      if (budgetMatch) {
        const maxBudget = Number(budgetMatch[1]);
        const price = p.variants[0]?.price || 99999;
        if (price <= maxBudget) {
          score += 20;
        } else {
          score -= 15;
        }
      }

      return { product: p, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const topMatches = scored.filter((s) => s.score > 0).slice(0, 4).map((s) => s.product);

    // If no direct score match, return bestsellers
    const finalRecommendations =
      topMatches.length > 0
        ? topMatches
        : allProducts.filter((p) => p.isBestSeller).slice(0, 4);

    let explanation = `Our AI Stylist analyzed your preference ("${prompt}") and curated ${finalRecommendations.length} exquisite Jaypurloom pieces tailored to your exact style and budget.`;
    if (lower.includes('wedding') || lower.includes('maroon')) {
      explanation = `For a royal celebration, we recommend rich Chanderi silk ensembles with authentic Gota Patti embroidery in regal maroon and gold tones that capture traditional Indian luxury.`;
    } else if (lower.includes('bedsheet')) {
      explanation = `We have selected our finest 300+ Thread Count super combed pure cotton Jaipuri block-printed bedsheets to elevate your bedroom sanctuary.`;
    }

    return {
      prompt,
      explanation,
      recommendations: finalRecommendations,
    };
  }
}
