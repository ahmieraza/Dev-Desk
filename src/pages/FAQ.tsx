import Layout from "@/components/Layout";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "How long does it take to complete a project?",
          answer: "Delivery time varies by project complexity. Simple assignments take 2-3 days, websites 1-2 weeks, and mobile apps 3-4 weeks. We offer rush delivery for urgent projects."
        },
        {
          question: "Do you provide revisions?",
          answer: "Yes! We offer unlimited revisions on premium plans and up to 3 revisions on standard projects to ensure you're completely satisfied with the final result."
        },
        {
          question: "Is my project information kept confidential?",
          answer: "Absolutely! We maintain 100% confidentiality. Your project details, code, and personal information are never shared with third parties."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept bank transfers, JazzCash, Easypaisa, PayPal, and cryptocurrency. Payment plans are available for larger projects."
        },
        {
          question: "Do you offer refunds?",
          answer: "Yes, we offer refunds if we cannot deliver the project as agreed. However, once work has started and milestones are approved, refunds are subject to our refund policy."
        },
        {
          question: "Can I see samples of your previous work?",
          answer: "Yes! Check our Portfolio page to see completed projects. We can also provide specific samples relevant to your project upon request."
        }
      ]
    },
    {
      category: "Web Development",
      questions: [
        {
          question: "What technologies do you use for web development?",
          answer: "We use modern technologies including React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Firebase, and more. We choose the best tech stack based on your project requirements."
        },
        {
          question: "Will my website be mobile-friendly?",
          answer: "Yes! All our websites are fully responsive and optimized for mobile, tablet, and desktop devices. We follow mobile-first design principles."
        },
        {
          question: "Do you provide website hosting?",
          answer: "We can help you set up hosting on platforms like Vercel, Netlify, AWS, or any hosting provider of your choice. Hosting costs are separate from development fees."
        },
        {
          question: "Can you redesign my existing website?",
          answer: "Absolutely! We can redesign and modernize your existing website while maintaining your content and improving performance, SEO, and user experience."
        }
      ]
    },
    {
      category: "Mobile App Development",
      questions: [
        {
          question: "Do you develop both iOS and Android apps?",
          answer: "Yes! We develop native iOS and Android apps, as well as cross-platform apps using React Native and Flutter that work on both platforms."
        },
        {
          question: "Will you help publish my app to app stores?",
          answer: "Yes, we assist with app store submission for both Google Play Store and Apple App Store, including preparing all required assets and descriptions."
        },
        {
          question: "Do you provide app maintenance after launch?",
          answer: "Yes, we offer ongoing maintenance and support packages to keep your app updated, fix bugs, and add new features as needed."
        },
        {
          question: "How much does a mobile app cost?",
          answer: "Mobile app costs start from $300 for basic apps. Complex apps with advanced features may cost more. Contact us for a detailed quote based on your requirements."
        }
      ]
    },
    {
      category: "Academic & Assignment Help",
      questions: [
        {
          question: "What subjects do you cover for assignments?",
          answer: "We cover programming (Python, Java, C++, JavaScript, etc.), web development, database projects, data structures, algorithms, machine learning, and more."
        },
        {
          question: "Can you help with urgent assignments?",
          answer: "Yes! We offer rush delivery for urgent assignments. Contact us with your deadline, and we'll do our best to accommodate your timeline."
        },
        {
          question: "Do you provide explanations with the code?",
          answer: "Yes, we provide detailed comments in the code and can include a separate documentation file explaining the logic and implementation."
        },
        {
          question: "Is the work plagiarism-free?",
          answer: "Absolutely! All our work is 100% original and written from scratch. We can provide plagiarism reports upon request."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "How is pricing determined?",
          answer: "Pricing depends on project complexity, timeline, and requirements. Check our Pricing page for standard rates, or contact us for a custom quote."
        },
        {
          question: "Do you require upfront payment?",
          answer: "We typically require 50% upfront and 50% upon completion. For larger projects, we can arrange milestone-based payments."
        },
        {
          question: "What is the Premium Membership?",
          answer: "Premium Membership costs $50/Rs 14,000 for 1 year and gives you 20% off all services, priority support, and unlimited revisions on all projects."
        },
        {
          question: "Can I get a discount for multiple projects?",
          answer: "Yes! We offer discounts for bulk orders and returning clients. Contact us to discuss your requirements and get a special rate."
        }
      ]
    },
    {
      category: "Support & Communication",
      questions: [
        {
          question: "How can I contact you?",
          answer: "You can reach us via WhatsApp (+92 304 7974977), email (azlanshahidd@gmail.com), or through our contact form. We respond within 24 hours."
        },
        {
          question: "What are your working hours?",
          answer: "We're available 24/7 for inquiries. Project work is done during business hours, but we accommodate different time zones for international clients."
        },
        {
          question: "Do you provide project updates?",
          answer: "Yes! We provide regular updates throughout the project and are always available to answer questions or address concerns."
        },
        {
          question: "What if I'm not satisfied with the work?",
          answer: "We offer revisions to ensure your satisfaction. If issues persist, we'll work with you to find a solution or provide a refund according to our policy."
        }
      ]
    }
  ];

  return (
    <Layout>
      <section className="py-12 md:py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Find answers to common questions about our services, pricing, and process
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {faqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, idx) => (
                    <details key={idx} className="card-glass rounded-xl p-5 md:p-6 shadow-premium border border-muted/30 group">
                      <summary className="font-bold text-foreground cursor-pointer list-none flex items-center justify-between">
                        <span className="text-sm md:text-base pr-4">{faq.question}</span>
                        <span className="text-primary text-xl group-open:rotate-180 transition-transform shrink-0">▼</span>
                      </summary>
                      <p className="text-muted-foreground text-sm md:text-base mt-3 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <div className="card-glass rounded-2xl p-6 md:p-8 shadow-premium">
              <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                Can't find the answer you're looking for? Feel free to reach out to us directly.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-premium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
