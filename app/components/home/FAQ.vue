<script setup lang="ts">
import Accordion from '@/components/ui/accordion/Accordion.vue'
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue'
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue'

const faqs = [
  {
    question: 'Công cụ tính GPA có chính xác không?',
    answer: 'Công cụ dựa trên công thức tính điểm trung bình tích lũy theo quy định của DTU. Bạn chỉ cần nhập đúng điểm và số tín chỉ, hệ thống sẽ cho kết quả chính xác.'
  },
  {
    question: 'Làm sao để dự đoán xếp loại bằng tốt nghiệp?',
    answer: 'Dựa vào GPA hiện tại và số tín chỉ đã tích lũy, công cụ sẽ gợi ý bạn đang ở mức nào (Giỏi, Khá, Trung bình) và mục tiêu cần phấn đấu.'
  },
  {
    question: 'Lộ trình tín chỉ hoạt động như thế nào?',
    answer: 'Bạn nhập tổng số tín chỉ đã học, hệ thống sẽ gợi ý số tín chỉ cần hoàn thành thêm để đạt mục tiêu bằng mong muốn.'
  },
  {
    question: 'Marketplace tài liệu có đảm bảo chất lượng không?',
    answer: 'Đây là nơi sinh viên mua/bán và chia sẻ tài liệu. Bạn nên kiểm tra nội dung trước khi mua, và có thể đánh giá, phản hồi để cộng đồng minh bạch hơn.'
  },
  {
    question: 'Tôi có cần đăng nhập để sử dụng không?',
    answer: 'Các công cụ tính toán (GPA, xếp loại, lộ trình) có thể dùng ngay. Marketplace cần đăng nhập để đăng bán hoặc mua tài liệu.'
  }
]
</script>

<template>
  <section id="faq" class="py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-20 right-20 w-24 h-24 bg-dtu-red/5 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-20 w-32 h-32 bg-dtu-red/5 rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          ❓ Câu hỏi <span class="text-dtu-red">thường gặp</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Những thắc mắc phổ biến về các công cụ hỗ trợ học tập
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <Accordion type="single" collapsible class="space-y-4">
          <AccordionItem 
            v-for="(faq, index) in faqs" 
            :key="index"
            :value="`item-${index}`"
            class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <AccordionTrigger class="px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-300 [&[data-state=open]>svg]:rotate-180">
              <h3 class="text-lg font-bold text-gray-900 pr-4 group-hover:text-dtu-red transition-colors duration-300">
                {{ faq.question }}
              </h3>
            </AccordionTrigger>
            <AccordionContent class="px-8 pb-6 border-t border-gray-100">
              <div class="pt-4">
                <p class="text-gray-600 leading-relaxed">
                  👉 {{ faq.answer }}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
</template>
